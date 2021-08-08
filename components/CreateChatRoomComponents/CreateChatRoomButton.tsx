import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

import { API, graphqlOperation, Auth } from "aws-amplify";
import {
  createChatRoom,
  createChatRoomUser,
} from "../../src/graphql/mutations";
import {
  getChatRoomUserID,
  getUserChatRoomNName,
  listUserChatRoomNName,
} from "./queries";
import {
  listChatRooms,
  listChatRoomUsers,
  chatRoomByName,
} from "../../src/graphql/queries";
import { useEffect, useState } from "react";

const sortArrs = (arr1, arr2, arr3) => {
  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < arr1.length; j++)
    list.push({ arr1: arr1[j], arr2: arr2[j], arr3: arr3[j] });

  //2) sort:
  list.sort(function (a, b) {
    return a.arr1 < b.arr1 ? -1 : a.arr1 == b.arr1 ? 0 : 1;
    //Sort could be modified to, for example, sort on the age
    // if the name is the same.
  });

  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
    arr1[k] = list[k].arr1;
    arr2[k] = list[k].arr2;
    arr3[k] = list[k].arr3;
  }
  return { arr1, arr2, arr3 };
};
const CreateChatRoomButton = (props: any) => {
  const { usersID, setFlashMessage, userInfo } = props;
  const [stateDisabled, setStateDisabled] = useState(false);

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      setFlashMessage(true);
      setStateDisabled(true);

      console.log("------- Start -----");

      var chatRoomID = null;
      const listForQuery = [];
      for (let i = 0; i < usersID.length; i++) {
        const userID = usersID[i];
        const val = {
          id: {
            eq: userID,
          },
        };
        listForQuery.push(val);
      }

      const usersChatRooms = await API.graphql(
        graphqlOperation(listUserChatRoomNName, {
          filter: {
            or: listForQuery,
          },
        })
      );

      var names = [];
      var ids = [];
      var imageUris = [];

      for (let i = 0; i < usersChatRooms.data.listUsers.items.length; i++) {
        names.push(usersChatRooms.data.listUsers.items[i].name);
        ids.push(usersChatRooms.data.listUsers.items[i].id);
        imageUris.push(usersChatRooms.data.listUsers.items[i].imageUri);
      }

      let output = sortArrs(ids, names, imageUris);
      ids = output.arr1;
      names = output.arr2;
      imageUris = output.arr3;

      var nameChatRoom = ids[0];
      for (let i = 1; i < usersChatRooms.data.listUsers.items.length; i++) {
        nameChatRoom = nameChatRoom + "-" + ids[i];
      }

      const chatRoom = await API.graphql(
        graphqlOperation(chatRoomByName, {
          name: nameChatRoom,
        })
      );
      console.log(chatRoom);
      try {
        chatRoomID = chatRoom.data.chatRoomByName.items[0].id;
      } catch {
        console.log("Chatroom does not exist");
        chatRoomID = null;
      }

      if (chatRoomID == null) {
        console.log("*****************************");
        //  1. Create a new Chat Room
        if (imageUris.length > 1) {
          // ask for chat name
        } else {
          const displayNameChat = "other guy name";
        }
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: {
              lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16",
              name: nameChatRoom,
            },
          })
        );

        if (!newChatRoomData.data) {
          console.log(" Failed to create a chat room");
          return;
        }

        const newChatRoom = newChatRoomData.data.createChatRoom;

        for (let i = 0; i < usersID.length; i++) {
          // 2. Add `user` to the Chat Room
          await API.graphql(
            graphqlOperation(createChatRoomUser, {
              input: {
                userID: usersID[i],
                chatRoomID: newChatRoom.id,
              },
            })
          );
        }
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
        names: names,
        myID: userInfo.attributes.sub,
        imageUris: imageUris,
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
      <View style={styles.createChatRoomButtonContainer}>
        <Text style={styles.creatChatRoomText}>Create ChatRoom</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateChatRoomButton;
