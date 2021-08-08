import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const [otherUsers, setOtherUsers] = useState(null);
  const [memberNames, setMemberNames] = useState(null);
  const [thisUser, setThisUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getOtherUsers = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setThisUser(userInfo.attributes.sub);
      var otherUsers = [];
      var names = [];
      for (let i = 0; i < chatRoom.chatRoomUsers.items.length; i++) {
        var user = chatRoom.chatRoomUsers.items[i].user;

        if (user.id != userInfo.attributes.sub) {
          otherUsers.push(user);
          names.push(user.name);
        }
      }
      setOtherUsers(otherUsers);
      setMemberNames(names);

      // if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
      //   setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      // } else {
      //   setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      // }
    };
    getOtherUsers();
  }, []);

  const onClick = () => {
    console.log("====================");
    const imageUris = [];
    for (let i = 0; i < otherUsers.length; i++) {
      imageUris.push(otherUsers[i].imageUri);
    }

    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      memberNames: memberNames,
      chatName: chatRoom.displayNameChat,
      myID: thisUser,
      imageUris: imageUris,
    });
  };

  if (!otherUsers) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image
            source={{ uri: otherUsers[0].imageUri }}
            style={styles.avatar}
          />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{chatRoom.displayNameChat}</Text>
            {/* <Text numberOfLines={2} style={styles.lastMessage}>
              {chatRoom.lastMessage ? `${chatRoom.lastMessage.user.name}` : ""}
            </Text> */}
          </View>
        </View>

        <Text style={styles.time}>
          {chatRoom.lastMessage &&
            moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
