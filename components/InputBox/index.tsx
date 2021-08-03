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
  const { chatRoomID } = props;

  const [message, setMessage] = useState("");
  const [myUserId, setMyUserId] = useState(null);
  const [recording, setRecording] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    };
    fetchUser();
  }, []);

  // const onMicrophonePress = () => {
  //   console.warn("Microphone");
  // };

  const _onLongPress = async () => {
    try {
      console.log("Requesting permissions..");
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(RecordingOptions);
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  const addAudioToDB = async (audioName) => {
    try {
      const newMessageData = await API.graphql(
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
          },
        })
      );
      console.log("onSendPress");
      console.log(chatRoomID); // chatroomid
      console.log("=============");

      // await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
    } catch (e) {
      console.log(e);
    }
  };

  const _onPressOut = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let recordingURI = recording.getURI();
    const response = await fetch(recordingURI);
    const blob = await response.blob();

    console.log("Recording stopped and stored at", recordingURI);
    try {
      const audioName = chatRoomID.concat(
        "/",
        myUserId,
        "----",
        Date.now(),
        ".m4a"
      );
      console.log(audioName);
      await Storage.put(audioName, blob).then((result) => {
        addAudioToDB(audioName);
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  // const updateChatRoomLastMessage = async (messageId: string) => {
  //   try {
  //     await API.graphql(
  //       graphqlOperation(updateChatRoom, {
  //         input: {
  //           id: chatRoomID,
  //           lastMessageID: messageId,
  //         },
  //       })
  //     );
  //     console.log("updateChatRoomLastMessage");
  //     console.log(chatRoomID);
  //     console.log("=============");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const onSendPress = async () => {
  //   try {
  //     const newMessageData = await API.graphql(
  //       graphqlOperation(createMessage, {
  //         input: {
  //           content: message,
  //           userID: myUserId,
  //           chatRoomID,
  //         },
  //       })
  //     );
  //     console.log("onSendPress");
  //     console.log(chatRoomID);
  //     console.log("=============");

  //     await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   setMessage("");
  // };

  // const onPress = () => {
  //   if (!message) {
  //     onMicrophonePress();
  //   } else {
  //     onSendPress();
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%" }}
    >
      <View style={styles.container}>
        {/* <View style={styles.mainContainer}>
          <FontAwesome5 name="laugh-beam" size={24} color="grey" />
          <TextInput
            placeholder={"Type a message"}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {!message && (
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
            />
          )}
        </View> */}
        <Pressable
          onLongPress={_onLongPress}
          onPressOut={_onPressOut}
          style={({ pressed }) => [
            pressed
              ? styles.buttonContainerPressed
              : styles.buttonContainerUnPressed,
          ]}
        >
          {/* <View style={styles.buttonContainer}> */}
          {/* {!message ? ( */}
          <MaterialCommunityIcons name="microphone" size={28} color="white" />
          {/* ) : (
            <MaterialIcons name="send" size={28} color="white" />
          )} */}
          {/* </View> */}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputBox;
