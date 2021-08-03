import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import { convertTime } from "../misc/helper";

import { useRoute } from "@react-navigation/native";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import {
  messagesByChatRoom,
  audioMessagesByChatRoom,
} from "../src/graphql/queries";
import { onCreateAudioMessage } from "../src/graphql/subscriptions";
import { updateAudioMessage } from "../src/graphql/mutations";

import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/background.png";
import InputBox from "../components/InputBox";
import { Audio, Video, AVPlaybackStatus } from "expo-av";

const ChatRoomScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const myID = props.route.params.myID;
  const [sound, setSound] = useState();
  const [status, setStatus] = useState({
    isLoaded: false,
    isPlaying: false,
    durationMillis: 0,
    audioProgress: 0,
    isBuffering: false,
  });
  const [pendingMessageCount, setPendingMessageCount] = useState(0);
  const [pace, setPace] = useState(1.0);
  const [buttonType, setButtonType] = useState("play");

  const route = useRoute();
  var messageIndex = useRef(-1);

  const sizeButtons = 30;
  const colorButtons = "white";

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
    // Remove messages that are not sent by me or Read
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].userID == myID) {
        messagesMine.push(messages[i]);
      }
    }
    messagesMine.sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
    );

    for (let i = 0; i < messagesMine.length; i++) {
      if (messagesMine[i].read == false) {
        messageIndex.current = i;
        break;
      }
    }
    if (messageIndex.current == -1) {
      // All messages have been read
      messageIndex.current = messagesMine.length;
      console.log(messageIndex.current);
    }

    setMessages(messagesMine);
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

  ///////////////////////////////// While Playing /////////////////////////////////
  const changeMusicState = async () => {
    if (buttonType == "play") {
      if (status.audioProgress == 0) {
        await playMusic();
      } else {
        await sound.playAsync();
      }
    } else {
      await sound.pauseAsync();
    }
  };
  const playMusic = async () => {
    if (messageIndex.current < pendingMessageCount) {
      try {
        setStatus((prevState) => ({
          ...prevState,
          isBuffering: true,
        }));
        const uri = await Storage.get(
          messages[messageIndex.current].content.key
        );

        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync({
          uri: uri,
        });
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        sound.setRateAsync(pace, true);

        setSound(sound);

        await sound.playAsync();
      } catch (e) {
        setStatus((prevState) => ({
          ...prevState,
          isBuffering: false,
        }));
      }
    }
  };

  const onPlaybackStatusUpdate = async (inp) => {
    if (inp.isPlaying) {
      setButtonType("pause");
    } else {
      setButtonType("play");
    }
    if (inp.durationMillis == null) {
      setStatus((prevState) => ({
        ...prevState,
        isLoaded: inp.isLoaded,
        isPlaying: inp.isPlaying,
        isBuffering: inp.isBuffering,
      }));
    } else {
      setStatus((prevState) => ({
        ...prevState,
        isLoaded: inp.isLoaded,
        isPlaying: inp.isPlaying,
        durationMillis: inp.durationMillis,
        audioProgress: inp.positionMillis / inp.durationMillis,
        isBuffering: inp.isBuffering,
      }));
    }
    if (inp.didJustFinish) {
      messages[messageIndex.current];
      // update in the data base that this has been read
      await API.graphql(
        graphqlOperation(updateAudioMessage, {
          input: {
            id: messages[messageIndex.current].id,
            read: true,
          },
        })
      );
      messageIndex.current = messageIndex.current + 1;
      // setMessageIndex(messageIndex + 1);

      await playMusic();
    }
  };

  const nextMessage = async () => {
    messageIndex.current = messageIndex.current + 1;
    await sound.stopAsync();
    playMusic();
  };

  const lastMessage = async () => {
    if (messageIndex.current > 0) {
      messageIndex.current = messageIndex.current - 1;
      await sound.stopAsync();
      playMusic();
    }
  };

  const changePace = async () => {
    if (pace == 1) {
      sound.setRateAsync(2, true);
      setPace(2);
    } else {
      setPace(1);
      sound.setRateAsync(1, true);
    }
  };
  ///////////////////////////////// While Playing /////////////////////////////////

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
          setStatus((prevState) => ({
            ...prevState,
            isBuffering: true,
          }));
        }
      : undefined;
  }, [sound]);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      {/* <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      /> */}

      {/* <View
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
      </View> */}

      {/* <Text>Pending Messages {pendingMessageCount}</Text>
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
      
       */}
      <View style={styles.clubhousePics}>
        <Image source={{ uri: route.params.imageUri }} style={styles.image} />
      </View>
      <View style={styles.audioNavigation}>
        <TouchableHighlight
          onPress={lastMessage} // style={styles.btnClickContain}
          underlayColor="#042417"
          style={styles.goBack}
        >
          <View>
            <MaterialCommunityIcons
              // name="power-off"
              name="skip-backward"
              size={sizeButtons}
              color={colorButtons}
            />
          </View>
        </TouchableHighlight>
        {status.isBuffering ? (
          <Text>
            <ActivityIndicator size={sizeButtons} color={colorButtons} />
          </Text>
        ) : (
          <TouchableHighlight onPress={changeMusicState}>
            <MaterialCommunityIcons
              name={buttonType}
              size={sizeButtons}
              color={colorButtons}
            />
          </TouchableHighlight>
        )}
        <TouchableHighlight
          onPress={nextMessage} // style={styles.btnClickContain}
          underlayColor="#042417"
          style={styles.goAhead}
        >
          <View>
            <MaterialCommunityIcons
              // name="power-off"
              name="skip-next"
              size={sizeButtons}
              color={colorButtons}
            />
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.bottomBar}>
        <TouchableHighlight>
          <Text style={styles.paceBar}>{pace}X</Text>
        </TouchableHighlight>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={status.audioProgress}
          disabled={true}
        />

        {/* <Button onPress={changePace} title="change pace" /> */}
        <View style={styles.recordButton}>
          <InputBox chatRoomID={route.params.id} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  image: {
    // justifyContent: "flex-start",
    // flex: 1,
    alignItems: "flex-start",
    width: "40%",
    height: "20%",
    borderRadius: 150 / 2,
    // overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
  slider: { width: "70%", height: 40, marginBottom: 5 },
  bottomBar: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 0,
    marginBottom: "10%",
    flexDirection: "row",
  },
  recordButton: {
    marginLeft: 5,
  },
  paceBar: {
    justifyContent: "flex-start",
    // flex: 1,
    marginBottom: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  audioNavigation: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // alignItems: "flex-end",
  },
  clubhousePics: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  goBack: {
    // flex: 1,
    marginRight: "20%",
  },
  goAhead: {
    marginLeft: "20%",
  },
});
