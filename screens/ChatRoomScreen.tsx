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

import { audioMessagesByChatRoom } from "../src/graphql/queries";
import { onCreateAudioMessage } from "../src/graphql/subscriptions";
import { updateAudioMessage } from "../src/graphql/mutations";

import BG from "../assets/images/background.png";
import InputBox from "../components/InputBox";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import Colors from "../constants/Colors";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
  // const [pace, setPace] = useState(1.0);
  const [buttonType, setButtonType] = useState("play");
  const [flashMessage, setFlashMessage] = useState("Idle");
  const [pendingMessageCount, setPendingMessageCount] = useState(0);
  const route = useRoute();
  const [members, setMembers] = useState([]);
  var messageIndex = useRef(-1);
  var pace = useRef(1.0);

  // var messages = useRef([]);

  const sizeButtons = 30;
  const colorButtons = "white";

  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(audioMessagesByChatRoom, {
        chatRoomID: route.params.id,
      })
    );

    var allChatRoomMessages = messagesData.data.audioMessagesByChatRoom.items;
    var messagesMine = [];

    // Remove messages that are not sent by me or Read
    for (let i = 0; i < allChatRoomMessages.length; i++) {
      if (allChatRoomMessages[i].userID !== myID) {
        messagesMine.push(allChatRoomMessages[i]);
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
    }

    setPendingMessageCount(messagesMine.length - messageIndex.current);
    setMessages(messagesMine);
  };

  useEffect(() => {
    fetchMessages();
    const members = [];
    for (let i = 0; i < route.params.imageUris.length; i++) {
      members.push({
        name: route.params.memberNames[i],
        imageUri: route.params.imageUris[i],
      });
    }
    setMembers(members);
    console.log(members);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  }, []);

  useEffect(() => {
    if (!status.isPlaying && !status.isBuffering && flashMessage == "Idle") {
      playMusic();
    }
  }, [messages, flashMessage]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateAudioMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateAudioMessage;

        if (newMessage.chatRoomID !== route.params.id) {
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
      if (status.audioProgress == 0 || status.audioProgress == 1) {
        await playMusic();
      } else {
        await sound.playAsync();
      }
    } else {
      await sound.pauseAsync();
    }
  };
  const playMusic = async () => {
    if (messageIndex.current < messages.length) {
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
        sound.setRateAsync(pace.current, true);

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
      await API.graphql(
        graphqlOperation(updateAudioMessage, {
          input: {
            id: messages[messageIndex.current].id,
            read: true,
          },
        })
      );
      messageIndex.current = messageIndex.current + 1;
      setPendingMessageCount(messages.length - messageIndex.current);
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

  // useEffect(() => {
  //   sound.setReateAsync(pace.current, true);
  // }, [pace])

  const changePace = async () => {
    console.log("Changing Pace");
    // sound.setReateAsync(pace.current, true);
    // if (pace == 1) {
    //   sound.setRateAsync(2, true);
    //   setPace(2);
    // } else {
    //   setPace(1);
    //   sound.setRateAsync(1, true);
    // }
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

  const array = [
    {
      key: "1",
      title: "example title 1",
      subtitle: "example subtitle 1",
    },
    {
      key: "2",
      title: "example title 2",
      subtitle: "example subtitle 2",
    },
    {
      key: "3",
      title: "example title 3",
      subtitle: "example subtitle 3",
    },
  ];

  const list = () => {
    return members.map((member) => {
      return (
        <View style={styles.clubhousePicsListItem}>
          <Image source={{ uri: member.imageUri }} style={styles.image} />
          <Text style={styles.clubhousePicsListItemText}>{member.name}</Text>
        </View>
      );
    });
  };

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <View style={styles.clubhousePics}>
        <View style={styles.clubhousePicsList}>{list()}</View>
      </View>
      {/* <Text>{members.length}</Text> */}

      <View>
        {flashMessage != "Idle" ? (
          <View style={styles.statusPopUp}>
            <Text style={styles.flashMessageStyle}>{flashMessage}</Text>
          </View>
        ) : (
          <Text></Text>
        )}
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
              name="skip-previous"
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
        {pendingMessageCount == 0 ? (
          <View style={styles.pendingMessagesBottomBar}>
            <Text style={styles.pendingMessagesText}>
              {pendingMessageCount}
            </Text>
          </View>
        ) : (
          <Text></Text>
        )}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={status.audioProgress}
          disabled={true}
        />

        <View style={styles.recordButton}>
          <InputBox
            chatRoomID={route.params.id}
            setFlashMessage={setFlashMessage}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  pendingMessages: {
    backgroundColor: "red",
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: windowWidth * 0.03,
    left: windowWidth * 0.07,
    top: -windowWidth * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },

  pendingMessagesText: {
    fontWeight: "bold",
  },
  image: {
    // justifyContent: "flex-start",
    // flex: 1,
    alignItems: "flex-start",
    width: windowWidth * 0.2, //"20%",
    height: windowWidth * 0.2, //"10%",
    borderRadius: windowWidth * 0.1,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "red",
  },
  clubhousePics: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  clubhousePicsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  clubhousePicsListItem: {
    margin: "5%",
    alignItems: "center",
    fontWeight: "bold",
  },
  clubhousePicsListItemText: {
    fontWeight: "bold",
    margin: 4,
  },
  // Bottom Bar ######################################
  bottomBar: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "flex-end",
    flex: 0,
    marginBottom: "10%",
    flexDirection: "row",
  },
  pendingMessagesBottomBar: {
    backgroundColor: "red",
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: windowWidth * 0.03,
    marginBottom: 15,
    // marginLeft: "5%",
    // marginRight: "10%",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "60%",
    height: 40,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 5,
  },

  recordButton: {
    marginLeft: 5,
  },
  paceBar: {
    justifyContent: "flex-start",
    marginBottom: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  // Bottom Bar ######################################

  // Navigation Bar ######################################
  audioNavigation: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  goBack: {
    // flex: 1,
    marginRight: "20%",
  },
  goAhead: {
    marginLeft: "20%",
  },
  statusPopUp: {
    opacity: 0.5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "bold",
    backgroundColor: Colors.CREAM_TOP,
    marginLeft: "30%",
    marginRight: "30%",
    marginBottom: 10,
  },
  // Navigation Bar ######################################
  flashMessageStyle: {
    fontWeight: "bold",
    color: "black",
  },
});
