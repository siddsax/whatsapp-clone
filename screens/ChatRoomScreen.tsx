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
  var firstRun = useRef(false);
  var messageFlatListRef = useRef(null);
  var playingOld = useRef(-1);
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
      onPlaybackStatusUpdate,
      isPlaying
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
    if (
      !status.isPlaying &&
      !isPlaying.current &&
      !status.isBuffering &&
      flashMessage == "Idle"
    ) {
      if (
        messageIndex.current < messagesSoundObj.length &&
        messageIndex.current != -1
      ) {
        playMusic(
          messageIndex.current,
          messagesSoundObj,
          messages,
          setSound,
          setStatus,
          onPlaybackStatusUpdate,
          isPlaying
        );
      }
    }
  }, [pendingMessageCount]);

  useEffect(() => {
    if (messageIndex.current > 1 && messageIndex.current < messages.length) {
      console.log("===");
      messageFlatListRef.current.scrollToIndex({
        animated: true,
        index: messageIndex.current,
      });
    } else if (
      messageIndex.current == messages.length &&
      messageIndex.current != 0
    ) {
      console.log("111");
      messageFlatListRef.current.scrollToIndex({
        animated: true,
        index: messageIndex.current - 1,
      });
    }
  }, [messageIndex.current, pendingMessageCount]);

  useEffect(() => {
    if (
      messagesSoundObj.length > messageIndex.current &&
      firstRun.current == false &&
      messageIndex.current != -1
    ) {
      firstRun.current = true;

      playMusic(
        messageIndex.current,
        messagesSoundObj,
        messages,
        setSound,
        setStatus,
        onPlaybackStatusUpdate,
        isPlaying
      );
    }
  }, [messagesSoundObj]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateAudioMessageShort)
    ).subscribe({
      next: async (data) => {
        const newMessage = data.value.data.onCreateAudioMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          return;
        }

        if (newMessage.readerID == myID) {
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
      if (playingOld.current > -1) {
        messages[playingOld.current].selected = false;
        playingOld.current = -1;
        isPlaying.current = false;
      } else {
        await API.graphql(
          graphqlOperation(updateAudioMessage, {
            input: {
              id: messages[messageIndex.current].id,
              readerID: myID,
              read: true,
            },
          })
        );

        messageIndex.current = messageIndex.current + 1;
        isPlaying.current = false;
        if (messages[messageIndex.current - 1].read == false) {
          await setPendingMessageCount((prevState) => prevState - 1);
        }
      }
    }
  };

  ///////////////////////////////// While Playing /////////////////////////////////

  // ////////////////////////////// Controls //////////////////////////////////////

  const chooseMessage = async (item: any) => {
    try {
      await sound.stopAsync();
    } catch (e) {
      console.log("Nothing to stop");
    }

    if (item.messageNumber == null) {
      item.messageNumber = messageIndex.current - 1;
    }

    item.selected = true;

    if (item.messageNumber > messageIndex.current) {
      for (let i = messageIndex.current; i < item.messageNumber; i++) {
        if (messages[i].read == false) {
          API.graphql(
            graphqlOperation(updateAudioMessage, {
              input: {
                id: messages[messageIndex.current - 1].id,
                read: true,
              },
            })
          );
        }
      }
      messageIndex.current = item.messageNumber;
      await setPendingMessageCount(
        (prevState) => prevState - (item.messageNumber - messageIndex.current)
      );
    } else {
      playingOld.current = item.messageNumber;
      // messageIndex.current = item.messageNumber;
      await playMusic(
        item.messageNumber,
        messagesSoundObj,
        messages,
        setSound,
        setStatus,
        onPlaybackStatusUpdate,
        isPlaying
      );
    }
  };

  // const nextMessage = async () => {
  //   messageIndex.current = messageIndex.current + 1;

  //   try {
  //     await sound.stopAsync();
  //   } catch (e) {
  //     console.log("Nothing to stop");
  //   }

  //   if (messages[messageIndex.current - 1].read == false) {
  //     API.graphql(
  //       graphqlOperation(updateAudioMessage, {
  //         input: {
  //           id: messages[messageIndex.current - 1].id,
  //           read: true,
  //         },
  //       })
  //     );
  //     await setPendingMessageCount((prevState) => prevState - 1);
  //   } else {
  //     if (messageIndex.current < messagesSoundObj.length) {
  //       await playMusic(
  //         messageIndex,
  //         messagesSoundObj,
  //         messages,
  //         setSound,
  //         setStatus,
  //         onPlaybackStatusUpdate,
  //         isPlaying
  //       );
  //     }
  //   }
  // };

  // const lastMessage = async () => {
  //   if (messageIndex.current > 0) {
  //     messageIndex.current = messageIndex.current - 1;
  //     try {
  //       await sound.stopAsync();
  //     } catch (e) {
  //       console.log("Nothing to stop");
  //     }

  //     await playMusic(
  //       messageIndex,
  //       messagesSoundObj,
  //       messages,
  //       setSound,
  //       setStatus,
  //       onPlaybackStatusUpdate,
  //       isPlaying
  //     );
  //   }
  // };

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
          console.log("--------- Unloading Sounds ----------");
          sound.unloadAsync();
          setStatus((prevState) => ({
            ...prevState,
            isBuffering: true,
          }));
        }
      : undefined;
  }, []);

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

  const sliderStyle = {
    sliderDummy: {
      backgroundColor: "#d3d3d3",
      width: 230,
      height: 30,
      borderRadius: 50,
      marginLeft: 22,
      // position: "absolute",
    },
    sliderReal: {
      backgroundColor: "#119EC2",
      width: (status.audioProgress / 50) * 300,
      height: 35,
    },
  };

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      imageStyle={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
      source={BG}
    >
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
        {/* <TouchableHighlight
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
        </TouchableHighlight> */}
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
        {/* <TouchableHighlight
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
        </TouchableHighlight> */}
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.pendingMessagesBottomBar}>
          <Text style={styles.pendingMessagesText}>{pendingMessageCount}</Text>
        </View>
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
            chatRoomName={route.params.chatName}
            setFlashMessage={setFlashMessage}
            otherUserIDs={route.params.otherUserIDs}
            otherUserTokens={route.params.otherUserTokens}
            myProfileURI={route.params.imageUri}
          />
        </View>
      </View>
      <View style={styles.messageFlatListContainer}>
        {messageIndex.current > -1 ? (
          <FlatList
            horizontal={true}
            data={messages}
            initialScrollIndex={
              messageIndex.current > 6 ? messageIndex.current - 1 : 0
            }
            ref={messageFlatListRef}
            getItemLayout={(data, index) => ({
              length: styles.imageFlatListMessage.height,
              offset: styles.imageFlatListMessage.height * index,
              index,
            })}
            renderItem={({ item, index, separators }) => (
              <TouchableHighlight
                key={item.id}
                onPress={() => chooseMessage(item)}
                // onShowUnderlay={separators.highlight}
                // onHideUnderlay={separators.unhighlight}
              >
                <View style={styles.messageItem}>
                  <Image
                    source={{ uri: item.senderProfileURI }}
                    style={
                      index == messageIndex.current || item.selected
                        ? styles.imageFlatListMessageAttention
                        : styles.imageFlatListMessage
                    }
                  />
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <></>
        )}
      </View>
    </ImageBackground>
  );
};

export default ChatRoomScreen;
