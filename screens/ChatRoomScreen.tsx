import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { convertTime } from "../misc/helper";

import { useRoute } from "@react-navigation/native";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";

import {
  messagesByChatRoom,
  audioMessagesByChatRoom,
} from "../src/graphql/queries";
import { onCreateAudioMessage } from "../src/graphql/subscriptions";

import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";
import { Audio, Video, AVPlaybackStatus } from "expo-av";

const ChatRoomScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const myID = props.route.params.myID;

  const route = useRoute();
  const [sound, setSound] = useState();
  const [status, setStatus] = useState({
    isLoaded: false,
    isPlaying: false,
    durationMillis: 0,
    audioProgress: 0,
    isBuffering: false,
  });
  const [pendingMessageCount, setPendingMessageCount] = useState(0);

  const onPlaybackStatusUpdate = (inp) => {
    console.log(inp);
    setStatus((prevState) => ({
      ...prevState,
      isLoaded: inp.isLoaded,
      isPlaying: inp.isPlaying,
      durationMillis: inp.durationMillis,
      audioProgress: inp.positionMillis / inp.durationMillis,
      isBuffering: inp.isBuffering,
    }));
  };

  const playMusic = async () => {
    try {
      const uri = await Storage.get(messages[0].content.key);
      setStatus((prevState) => ({
        ...prevState,
        isBuffering: true,
      }));

      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync({
        uri: uri,
      });
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      setSound(sound);

      await sound.playAsync();
    } catch (e) {
      console.log(e);
      setStatus((prevState) => ({
        ...prevState,
        isBuffering: false,
      }));
    }
  };

  const pauseMusic = async () => {
    await sound.pauseAsync();
  };

  const onMoveSlider = async (val) => {
    sound.playFromPositionAsync(val * status.durationMillis);
    console.log("Moving slider");
  };

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //         setStatus((prevState) => ({
  //           ...prevState,
  //           isBuffering: true,
  //         }));
  //       }
  //     : undefined;
  // }, [sound]);

  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(audioMessagesByChatRoom, {
        chatRoomID: route.params.id,
        sortDirection: "DESC",
      })
    );
    console.log("FETCH MESSAGES");

    var messages = messagesData.data.audioMessagesByChatRoom.items;
    var messagesMine = [];
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].userID == myID) {
        messagesMine.push(messages[i]);
      }
    }
    setMessages(messagesMine);
    console.log("===============");
    console.log(messagesMine[0]);
    console.log("===============");
    setPendingMessageCount(messagesMine.length);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateAudioMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateAudioMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          console.log("Message is in another room!");
          return;
        }

        fetchMessages();
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  // console.log(`messages in state: ${messages.length}`);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      {/* <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      /> */}
      <View
        style={{
          // flexDirection: "row",
          // justifyContent: "space-between",
          paddingHorizontal: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          {status.durationMillis * status.audioProgress}/{status.durationMillis}
        </Text>
      </View>

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={status.audioProgress}
        onValueChange={onMoveSlider}
      />

      <Text>Pending Messages {pendingMessageCount}</Text>
      {status.isBuffering ? (
        <Text>
          <ActivityIndicator size="small" color="#0000ff" />
        </Text>
      ) : (
        <Text>
          <Button onPress={playMusic} title="Play Music" />
        </Text>
      )}

      <Button onPress={pauseMusic} title="Pause Music" />

      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
