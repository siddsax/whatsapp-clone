import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import styles from "./styles";

import { API, Auth, graphqlOperation, Storage } from "aws-amplify";

import {
  createMessage,
  updateChatRoom,
  createAudioMessage,
} from "../../src/graphql/mutations";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import awsExports from "../../aws-exports";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Notifications from "expo-notifications";
import "../../global.js";
const RecordingOptions = {
  ios: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_LOW,
    sampleRate: 8000,
    numberOfChannels: 1,
    bitRateStrategy: 3,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
    bitRate: 64000,
  },
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
};

const InputBox = (props) => {
  const {
    chatRoomID,
    chatRoomName,
    setFlashMessage,
    otherUserIDs,
    otherUserTokens,
    myProfileURI,
  } = props;

  const [userInfo, setUserInfo] = useState("");
  const [myUserId, setMyUserId] = useState(null);
  const [recording, setRecording] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserInfo(userInfo);
      setMyUserId(userInfo.attributes.sub);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    };
    fetchUser();
  }, []);

  // const onMicrophonePress = () => {
  //   console.warn("Microphone");
  // };

  const _onLongPress = async () => {
    try {
      setFlashMessage("Recording");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(RecordingOptions);
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const updateChatRoomLastMessage = async (messageId: string) => {
    try {
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            id: chatRoomID,
            lastMessageID: messageId,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  async function sendPushNotification(expoPushToken, messageBody) {
    const message = {
      to: expoPushToken,
      // to: "ExponentPushToken[azEzVGNuQs3x5IjgCG3yHT]",
      sound: "default",
      title: "Your friend wants to talk to you",
      body: messageBody,
      // data: { someData: 'goes here' },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const addAudioToDB = async (audioName) => {
    try {
      for (let i = 0; i < otherUserIDs.length; i++) {
        // console.log(myProfileURI, "+++++++++");
        const newMessageData = API.graphql(
          graphqlOperation(createAudioMessage, {
            input: {
              content: {
                bucket: awsExports.aws_user_files_s3_bucket,
                region: awsExports.aws_user_files_s3_bucket_region,
                key: audioName,
              },
              userID: myUserId,
              chatRoomID,
              read: false,
              readerID: otherUserIDs[i],
              senderProfileURI: global.userData.data.getUser.imageUri,
            },
          })
        );
        var notificationMessage;
        if (otherUserIDs.length > 1) {
          notificationMessage = "You have recieved message in group ".concat(
            chatRoomName
          );
        } else {
          notificationMessage = "You have recieved message from ".concat(
            userInfo.username
          );
        }

        sendPushNotification(otherUserTokens[i], notificationMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _onPressOut = async () => {
    setRecording(undefined);
    try {
      await recording.stopAndUnloadAsync();
    } catch (e) {
      console.log("Recording abandandoned");
      return;
    }
    let recordingURI = recording.getURI();
    const response = await fetch(recordingURI);
    const blob = await response.blob();

    try {
      const audioName = chatRoomID.concat(
        "/",
        myUserId,
        "----",
        Date.now(),
        ".m4a"
      );

      setFlashMessage("Sent");
      setTimeout(() => {
        setFlashMessage("Idle");
      }, 1000);

      await Storage.put(audioName, blob).then((result) => {
        // setFlashMessage("Sent");
        addAudioToDB(audioName);
        // setTimeout(() => {
        //   setFlashMessage("Idle");
        // }, 1000);
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%" }}
    >
      <View style={styles.container}>
        <Pressable
          onLongPress={_onLongPress}
          onPressOut={_onPressOut}
          style={({ pressed }) => [
            pressed
              ? styles.buttonContainerPressed
              : styles.buttonContainerUnPressed,
          ]}
        >
          <MaterialCommunityIcons name="microphone" size={28} color="black" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputBox;
