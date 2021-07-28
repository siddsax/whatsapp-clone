import * as React from "react";
import { FlatList, StyleSheet, Text, Pressable } from "react-native";
import { View } from "../components/Themed";
import ChatListItem from "../components/ChatListItem";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";

import chatRooms from "../data/ChatRooms";
import NewMessageButton from "../components/NewMessageButton";
import { useEffect, useState } from "react";

import { getUser } from "./queries";
import { useIsFocused } from "@react-navigation/native";
import { Audio } from "expo-av";
import awsExports from "../aws-exports";
import { createAudioMessage } from "../src/graphql/mutations";

export default function RecordScreen() {
  const [recording, setRecording] = useState();
  const [isPlaying, setPlaying] = useState(false);
  const [consTime, setConstTime] = useState(15);
  const [recordedTime, setRecordedTime] = useState(0);
  const [spinnerKey, setSpinnerKey] = useState(false);

  const _onLongPress = async () => {
    try {
      console.log("Requesting permissions..");
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      setPlaying(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const addAudioToDB = async (audioName) => {
    const chatRoomID = "63b8045f-aec7-4083-ab2a-bb7f7531dab4";
    try {
      const newMessageData = await API.graphql(
        graphqlOperation(createAudioMessage, {
          input: {
            content: {
              bucket: awsExports.aws_user_files_s3_bucket,
              region: awsExports.aws_user_files_s3_bucket_region,
              key: audioName,
            },
            userID: "13131",
            chatRoomID, // chatroomid
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
    setPlaying(false);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let recordingURI = recording.getURI();
    const response = await fetch(recordingURI);
    const blob = await response.blob();

    console.log("Recording stopped and stored at", recordingURI);
    try {
      const audioName = "name.caf";
      await Storage.put(audioName, blob).then((result) => {
        addAudioToDB(audioName);
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);
  return (
    // <Text> Press Me!</Text>
    <Pressable onLongPress={_onLongPress} onPressOut={_onPressOut}>
      <Text> Press Me Now!</Text>
      {/* {checkTime(remainingTime, elapsedTime)}
                        <LinearGradient
                            colors={['#F9195F', '#FADD0B']}
                            style={styles.linearGradient}>
                            <Animated.Text style={styles.textStyle}>
                                {remainingTime}
                            </Animated.Text>
                            <Text style={styles.secsStyle}>secs left</Text>
                        </LinearGradient> */}
    </Pressable>
  );
}
