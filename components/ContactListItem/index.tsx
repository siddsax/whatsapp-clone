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
import { getChatRoomUserID, getUserChatRoomNName } from "./queries";
import { listChatRooms } from "../../src/graphql/queries";
import { useEffect, useState } from "react";

const ContactListItem = (props: any) => {
  const { user, setFlashMessage, userInfo } = props;
  const [stateDisabled, setStateDisabled] = useState(false);

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      setFlashMessage(true);
      setStateDisabled(true);

      console.log("------- Start -----");

      var chatRoomID = null;
      const userFull = await API.graphql(
        graphqlOperation(getUserChatRoomNName, { id: user.id })
      );
      const userChatRooms = userFull.data.getUser.chatRoomUser.items;

      // ################################################
      // const testing = await API.graphql(
      //   graphqlOperation(listChatRooms, {
      //     filter: {
      //       id: {
      //         between: [
      //           userChatRooms[1].chatRoomID,
      //           userChatRooms[0].chatRoomID,
      //         ],
      //       },
      //     },
      //   })
      // );
      // console.log(testing);
      // ################################################

      console.log("------- End 1 -----");
      for (let i = 0; i < userChatRooms.length; i++) {
        const chatRoom = await API.graphql(
          graphqlOperation(getChatRoomUserID, {
            id: userChatRooms[i].chatRoomID,
          })
        );
        // Update the query afterwards to not get useless data
        var users = chatRoom.data.getChatRoom.chatRoomUsers.items;
        var flagOK = true;
        for (let j = 0; j < users.length; j++) {
          var userChat = users[j].userID;
          if (userChat != user.id && userChat != userInfo.attributes.sub) {
            flagOK = false;
          }
        }
        if (flagOK == true) {
          chatRoomID = userChatRooms[i].chatRoomID;
          break;
        }
      }
      console.log("------- End -----");

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
      console.log(userFull.data);

      navigation.navigate("ChatRoom", {
        id: chatRoomID,
        name: userFull.data.getUser.name,
        myID: userInfo.attributes.sub,
        imageUri: userFull.data.getUser.imageUri,
      });
      setFlashMessage(false);
      setStateDisabled(false);
    } catch (e) {
      console.log(e);
      setFlashMessage(false);
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
