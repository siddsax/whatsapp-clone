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

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { onCreateAudioMessageShort } from "./subscriptions";
import { updateAudioMessage } from "../src/graphql/mutations";

import { useRoute } from "@react-navigation/native";
import BG from "../assets/images/background.png";
import InputBox from "../components/InputBox";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import { styles } from "./screenStyles";
import { fetchMessages, pushSoundObj, playMusic } from "./fetchMessages";

const ChatRoomScreen = (props) => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [messagesSoundObj, setMessagesSoundObj] = useState([]);
  const [sound, setSound] = useState();
  const [status, setStatus] = useState({
    isLoaded: false,
    durationMillis: 0,
    audioProgress: 0,
    isBuffering: false,
    isPlaying: false,
  });
  const [buttonType, setButtonType] = useState("play");
  const [flashMessage, setFlashMessage] = useState("Idle");
  const [pendingMessageCount, setPendingMessageCount] = useState(0);
  const [members, setMembers] = useState([]);

  // ######################################
  var messageIndex = useRef(-1);
  var pace = useRef(1.0);
  var isPlaying = useRef(false);
  // ######################################

  const myID = props.route.params.myID;
  const sizeButtons = 30;
  const colorButtons = "white";

  useEffect(() => {
    fetchMessages(
      route,
      messageIndex,
      setMessages,
      setMessagesSoundObj,
      setPendingMessageCount,
      messagesSoundObj,
      messages,
      setSound,
      setStatus,
      onPlaybackStatusUpdate
    );

    const members = [];
    for (let i = 0; i < route.params.imageUris.length; i++) {
      members.push({
        key: i,
        name: route.params.memberNames[i],
        imageUri: route.params.imageUris[i],
      });
    }
    setMembers(members);
  }, []);

  useEffect(() => {
    console.log("**********", messageIndex.current, messagesSoundObj.length);
    if (
      !status.isPlaying &&
      !isPlaying.current &&
      !status.isBuffering &&
      flashMessage == "Idle"
    ) {
      if (messageIndex.current < messagesSoundObj.length) {
        playMusic(
          messageIndex,
          messagesSoundObj,
          messages,
          setSound,
          setStatus,
          onPlaybackStatusUpdate
        );
      }
    }
  }, [pendingMessageCount]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateAudioMessageShort)
    ).subscribe({
      next: async (data) => {
        const newMessage = data.value.data.onCreateAudioMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          return;
        }

        if (newMessage.userID !== myID) {
          await pushSoundObj(newMessage, setMessages, setMessagesSoundObj);
          await setPendingMessageCount((prevState) => prevState + 1);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  ///////////////////////////////// While Playing /////////////////////////////////
  const onPlaybackStatusUpdate = async (inp) => {
    if (inp.isPlaying) {
      setButtonType("pause");
    } else {
      setButtonType("play");
    }
    isPlaying.current = inp.isPlaying;
    if (inp.durationMillis == null) {
      await setStatus((prevState) => ({
        ...prevState,
        isLoaded: inp.isLoaded,
        isBuffering: inp.isBuffering,
        isPlaying: inp.isPlaying,
      }));
    } else {
      await setStatus((prevState) => ({
        ...prevState,
        isLoaded: inp.isLoaded,
        durationMillis: inp.durationMillis,
        audioProgress: inp.positionMillis / inp.durationMillis,
        isBuffering: inp.isBuffering,
        isPlaying: inp.isPlaying,
      }));
    }
    if (inp.didJustFinish) {
      console.log(
        inp.didJustFinish,
        "+++++++++++++++++++++++++++++",
        messageIndex.current
      );
      await API.graphql(
        graphqlOperation(updateAudioMessage, {
          input: {
            id: messages[messageIndex.current].id,
            read: true,
          },
        })
      );

      messageIndex.current = messageIndex.current + 1;
      if (messages[messageIndex.current - 1].read == false) {
        await setPendingMessageCount((prevState) => prevState - 1);
      }

      // if (messageIndex.current < messagesSoundObj.length) {
      //   await playMusic(
      //     messageIndex,
      //     messagesSoundObj,
      //     messages,
      //     setSound,
      //     setStatus,
      //     onPlaybackStatusUpdate
      //   );
      // }
    }
  };

  ///////////////////////////////// While Playing /////////////////////////////////

  // ////////////////////////////// Controls //////////////////////////////////////
  const nextMessage = async () => {
    messageIndex.current = messageIndex.current + 1;

    try {
      await sound.stopAsync();
    } catch (e) {
      console.log("Nothing to stop");
    }

    if (messages[messageIndex.current - 1].read == false) {
      await API.graphql(
        graphqlOperation(updateAudioMessage, {
          input: {
            id: messages[messageIndex.current - 1].id,
            read: true,
          },
        })
      );
      await setPendingMessageCount((prevState) => prevState - 1);
    } else {
      if (messageIndex.current < messagesSoundObj.length) {
        await playMusic(
          messageIndex,
          messagesSoundObj,
          messages,
          setSound,
          setStatus,
          onPlaybackStatusUpdate
        );
      }
    }
  };

  const lastMessage = async () => {
    if (messageIndex.current > 0) {
      messageIndex.current = messageIndex.current - 1;
      try {
        await sound.stopAsync();
      } catch (e) {
        console.log("Nothing to stop");
      }

      await playMusic(
        messageIndex,
        messagesSoundObj,
        messages,
        setSound,
        setStatus,
        onPlaybackStatusUpdate
      );
    }
  };

  const changeMusicState = async () => {
    if (buttonType == "play") {
      if (status.audioProgress == 0 || status.audioProgress == 1) {
        await nextMessage();
      } else {
        await sound.playAsync();
      }
    } else {
      await sound.pauseAsync();
    }
  };

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

  const listProfiles = () => {
    return members.map((member) => {
      return (
        <View style={styles.clubhousePicsListItem} key={member.key}>
          <Image source={{ uri: member.imageUri }} style={styles.image} />
          <Text style={styles.clubhousePicsListItemText}>{member.name}</Text>
        </View>
      );
    });
  };

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <View style={styles.clubhousePics}>
        <View style={styles.clubhousePicsList}>{listProfiles()}</View>
      </View>

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
          onPress={lastMessage}
          underlayColor="#042417"
          style={styles.goBack}
        >
          <View>
            <MaterialCommunityIcons
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
          onPress={nextMessage}
          underlayColor="#042417"
          style={styles.goAhead}
        >
          <View>
            <MaterialCommunityIcons
              name="skip-next"
              size={sizeButtons}
              color={colorButtons}
            />
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.bottomBar}>
        {pendingMessageCount != 0 ? (
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
