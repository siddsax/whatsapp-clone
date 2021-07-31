import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Button,
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

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  const route = useRoute();
  const [sound, setSound] = useState();
  const [status, setStatus] = useState({
    isLoaded: false,
    isPlaying: false,
    durationMillis: 0,
    positionMillis: 0,
  });

  const onPlaybackStatusUpdate = (inp) => {
    setStatus((prevState) => ({
      ...prevState,
      isLoaded: inp.isLoaded,
      isPlaying: inp.isPlaying,
      durationMillis: inp.durationMillis,
      positionMillis: inp.positionMillis,
    }));
    console.log(inp);
    console.log("------------");
  };

  const playMusic = async () => {
    console.log("------------");
    console.log(messages);
    console.log(messages[0].content.key);
    const uri = await Storage.get(messages[0].content.key);
    console.log(uri);

    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync({
      uri: uri,
      // uri: "file:///Users/siddharthasaxena/Library/Developer/CoreSimulator/Devices/BCD1A250-BEBF-43E3-91D0-CB4A59A0E0F1/data/Containers/Data/Application/C6EFA722-04E1-4172-A50D-C8C58E7F59C0/Library/Caches/ExponentExperienceData/%2540siddsax%252FWhatsappClone/AV/recording-504E9592-1FAC-4942-AFE3-D8E5B072BC7B.caf",
      // uri: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    });
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    setSound(sound);

    await sound.playAsync();
  };

  const pauseMusic = async () => {
    await sound.pauseAsync();
  };

  // const onMoveSlider = async (val) => {
  //   sound.playFromPositionAsync(val * status.durationMillis);
  //   console.log("Moving slider");
  // };
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
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
    setMessages(messagesData.data.audioMessagesByChatRoom.items);
    // setMessages(messagesData.data.messagesByChatRoom.items);
    console.log(messagesData.data.audioMessagesByChatRoom.items);
    console.log("+++++++++++");
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    };
    getMyId();
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
          {status.positionMillis}/{status.durationMillis}
        </Text>
      </View>

      {/* <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={onMoveSlider}
      /> */}
      <Button onPress={playMusic} title="Play Music" />
      <Button onPress={pauseMusic} title="Pause Music" />

      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
