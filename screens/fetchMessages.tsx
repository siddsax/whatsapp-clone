import { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { audioMessagesByChatRoom } from "../src/graphql/queries";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import { updateAudioMessage } from "../src/graphql/mutations";

export const pushSoundObj = async (
  message: any,
  setMessages: any,
  setMessagesSoundObj: any
) => {
  const uri = await Storage.get(message.content.key);

  const soundObject = new Audio.Sound();
  await soundObject.loadAsync({ uri: uri });
  await setMessages((oldMessages) => [...oldMessages, message]);
  await setMessagesSoundObj((oldArray) => [...oldArray, soundObject]);
};

export const fetchMessages = async (
  route: any,
  messageIndex: any,
  setMessages: any,
  setMessagesSoundObj: any,
  setPendingMessageCount: any,
  messagesSoundObj: any,
  messages: any,
  setSound: any,
  setStatus: any,
  onPlaybackStatusUpdate: any,
  isPlaying: any
) => {
  const myID = route.params.myID;

  const messagesData = await API.graphql(
    graphqlOperation(audioMessagesByChatRoom, {
      chatRoomID: route.params.id,
      filter: {
        readerID: {
          eq: myID,
        },
      },
    })
  );

  var messagesMine = messagesData.data.audioMessagesByChatRoom.items;
  messagesMine.sort(
    (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
  );

  // var countUnread = 0
  for (let i = 0; i < messagesMine.length; i++) {
    if (messagesMine[i].read == false) {
      messageIndex.current = i;
      break;
    }
  }

  for (let i = 0; i < messagesMine.length; i++) {
    messagesMine[i].messageNumber = i;
    messagesMine[i].selected = false;
    messagesMine[i].disabled = false;
  }

  if (messageIndex.current == -1) {
    messageIndex.current = messagesMine.length;
  }
  await setMessages(messagesMine);

  await setPendingMessageCount(messagesMine.length - messageIndex.current);
  if (messagesMine.length - messageIndex.current > 0) {
    await setStatus((prevState: any) => ({
      ...prevState,
      isBuffering: true,
    }));
  }
  // When loading for first time, ones before messageIndex.current are read, hence dont need to be loaded

  for (let i = 0; i < messagesMine.length; i++) {
    if (i < messageIndex.current) {
      await setMessagesSoundObj((prevState: any) => [...prevState, null]);
    } else {
      const uri = await Storage.get(messagesMine[i].content.key);

      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: uri });
      await setMessagesSoundObj((prevState: any) => [
        ...prevState,
        soundObject,
      ]);
    }
  }
};

export const playMusic = async (
  messageIndexValue: any,
  messagesSoundObj: any,
  messages: any,
  setSound: any,
  setStatus: any,
  onPlaybackStatusUpdate: any,
  isPlaying: any
) => {
  try {
    isPlaying.current = true;
    await setStatus((prevState: any) => ({
      ...prevState,
      isBuffering: true,
    }));
    var sound = messagesSoundObj[messageIndexValue];

    if (sound == null) {
      var uri;
      try {
        uri = await Storage.get(messages[messageIndexValue].content.key);
      } catch (e) {
        console.log("@@@@@@@@@@@@@@@@");
        console.log(e);
        console.log(
          messageIndexValue,
          messages.length,
          messagesSoundObj.length
        );
        console.log(messages[messageIndexValue]);
      }

      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync({
        uri: uri,
      });
      await sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      //   sound.setRateAsync(pace.current, true);

      await setSound(sound);

      await sound.playAsync();
    } else {
      await sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      //   sound.setRateAsync(pace.current, true);

      await setSound(sound);

      await sound.playAsync();
    }
    // isPlaying.current = false;
  } catch (e) {
    console.log(e);
    await setStatus((prevState: any) => ({
      ...prevState,
      isBuffering: false,
    }));
  }
};
