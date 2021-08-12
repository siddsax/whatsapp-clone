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
  setPendingMessageCount: any
) => {
  const myID = route.params.myID;

  const messagesData = await API.graphql(
    graphqlOperation(audioMessagesByChatRoom, {
      chatRoomID: route.params.id,
    })
  );

  var allChatRoomMessages = messagesData.data.audioMessagesByChatRoom.items;
  var messagesMine = [];

  // Remove messages that are Read
  for (let i = 0; i < allChatRoomMessages.length; i++) {
    if (allChatRoomMessages[i].userID !== myID) {
      messagesMine.push(allChatRoomMessages[i]);
    }
  }
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
  if (messageIndex.current == -1) {
    // All messages have been read
    messageIndex.current = messagesMine.length;
  }

  await setPendingMessageCount(messagesMine.length - messageIndex.current);
  // When loading for first time, ones before messageIndex.current are read, hence dont need to be loaded

  var soundObjects = [];

  for (let i = 0; i < messagesMine.length; i++) {
    if (i < messageIndex.current) {
      soundObjects.push(null);
    } else {
      const uri = await Storage.get(messagesMine[i].content.key);

      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: uri });
      soundObjects.push(soundObject);
    }
  }

  await setMessages(messagesMine);
  await setMessagesSoundObj(soundObjects);
};

export const playMusic = async (
  messageIndex: any,
  messagesSoundObj: any,
  messages: any,
  setSound: any,
  setStatus: any,
  onPlaybackStatusUpdate: any
) => {
  try {
    await setStatus((prevState: any) => ({
      ...prevState,
      isBuffering: true,
    }));
    var sound = messagesSoundObj[messageIndex.current];

    if (sound == null) {
      const uri = await Storage.get(messages[messageIndex.current].content.key);

      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync({
        uri: uri,
      });
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      //   sound.setRateAsync(pace.current, true);

      await setSound(sound);

      await sound.playAsync();
    } else {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      //   sound.setRateAsync(pace.current, true);

      setSound(sound);

      sound.playAsync();
    }
  } catch (e) {
    await setStatus((prevState: any) => ({
      ...prevState,
      isBuffering: false,
    }));
  }
};
