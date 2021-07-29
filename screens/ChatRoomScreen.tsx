import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import { convertTime } from "../misc/helper";

import { useRoute } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";

import { messagesByChatRoom } from "../src/graphql/queries";
import { onCreateMessage } from "../src/graphql/subscriptions";

import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";
// import Sound from "react-native-sound";

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  const route = useRoute();
  // Sound.setCategory("Playback");

  // var whoosh = new Sound("whoosh.mp3", Sound.MAIN_BUNDLE, (error) => {
  //   if (error) {
  //     console.log("failed to load the sound", error);
  //     return;
  //   }
  //   // loaded successfully
  //   console.log(
  //     "duration in seconds: " +
  //       whoosh.getDuration() +
  //       "number of channels: " +
  //       whoosh.getNumberOfChannels()
  //   );

  //   // Play the sound with an onEnd callback
  //   whoosh.play((success) => {
  //     if (success) {
  //       console.log("successfully finished playing");
  //     } else {
  //       console.log("playback failed due to audio decoding errors");
  //     }
  //   });
  // });

  // const fetchMessages = async () => {
  //   const messagesData = await API.graphql(
  //     graphqlOperation(messagesByChatRoom, {
  //       chatRoomID: route.params.id,
  //       sortDirection: "DESC",
  //     })
  //   );
  //   console.log("FETCH MESSAGES");
  //   setMessages(messagesData.data.messagesByChatRoom.items);
  // };

  // useEffect(() => {
  //   fetchMessages();
  // }, []);

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    };
    getMyId();
  }, []);

  // useEffect(() => {
  //   const subscription = API.graphql(
  //     graphqlOperation(onCreateMessage)
  //   ).subscribe({
  //     next: (data) => {
  //       const newMessage = data.value.data.onCreateMessage;

  //       if (newMessage.chatRoomID !== route.params.id) {
  //         console.log("Message is in another room!");
  //         return;
  //       }

  //       fetchMessages();
  //     },
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // console.log(`messages in state: ${messages.length}`);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      ></View>

      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;

//  uri: "file:///Users/siddharthasaxena/Library/Developer/CoreSimulator/Devices/BCD1A250-BEBF-43E3-91D0-CB4A59A0E0F1/data/Containers/Data/Application/E9E640E6-E03C-4D8E-80F6-C40B3739ABFD/Library/Caches/ExponentExperienceData/%2540siddsax%252FWhatsappClone/AV/recording-2F6D5CE9-B7B9-49B9-AE55-546791596E64.caf",
