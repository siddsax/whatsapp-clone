import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

import { API, graphqlOperation, Auth } from "aws-amplify";
import {
  createChatRoom,
  createChatRoomUser,
} from "../../src/graphql/mutations";
import { listChatRooms, getUser, getChatRoom } from "../../src/graphql/queries";
import { useEffect, useState } from "react";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  const [stateDisabled, setStateDisabled] = useState(false);

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      setStateDisabled(true);

      const userInfo = await Auth.currentAuthenticatedUser();

      const userFull = await API.graphql(
        graphqlOperation(getUser, { id: user.id })
      );

      var chatRoomID = null;

      console.log([user.id, userInfo.attributes.sub]);

      const chatRooms = userFull.data.getUser.chatRoomUser.items;
      var chatRoomID = null;

      for (let i = 0; i < chatRooms.length; i++) {
        const chatRoom = await API.graphql(
          graphqlOperation(getChatRoom, { id: chatRooms[i].chatRoomID })
        );
        // Update the query afterwards to not get useless data
        var users = chatRoom.data.getChatRoom.chatRoomUsers.items;
        var flagOK = true;
        for (let j = 0; j < users.length; j++) {
          var userChat = users[j].userID;
          console.log(userChat);
          if (userChat != user.id && userChat != userInfo.attributes.sub) {
            flagOK = false;
          }
        }
        console.log(flagOK, chatRoomID);
        console.log("--------");
        if (flagOK == true) {
          chatRoomID = chatRooms[i].chatRoomID;
          break;
        }
      }
      console.log(chatRoomID);

      if (chatRoomID == null) {
        //  1. Create a new Chat Room
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: {
              lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16",
            },
          })
        );

        if (!newChatRoomData.data) {
          console.log(" Failed to create a chat room");
          return;
        }

        const newChatRoom = newChatRoomData.data.createChatRoom;

        // 2. Add `user` to the Chat Room
        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: user.id,
              chatRoomID: newChatRoom.id,
            },
          })
        );

        //  3. Add authenticated user to the Chat Room
        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: userInfo.attributes.sub,
              chatRoomID: newChatRoom.id,
            },
          })
        );

        chatRoomID = newChatRoom.id;
      }

      navigation.navigate("ChatRoom", {
        id: chatRoomID,
        name: "Hardcoded name",
      });
      setStateDisabled(false);
    } catch (e) {
      console.log(e);
      setStateDisabled(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick} disabled={stateDisabled}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
