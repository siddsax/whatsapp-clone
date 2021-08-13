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
import Dialog from "react-native-dialog";

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
  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [chatName, setChatName] = useState("");

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

      console.log("Will do Q1");

      const usersChatRooms = await API.graphql(
        graphqlOperation(listUserChatRoomNName, {
          filter: {
            or: listForQuery,
          },
        })
      );
      console.log("Q1 Done");

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

      var nameChatRoom = userInfo.attributes.sub;
      for (let i = 0; i < usersChatRooms.data.listUsers.items.length; i++) {
        nameChatRoom = nameChatRoom + "-" + ids[i];
      }

      if (names.length == 1) {
        console.log("Will do Q2");
        const chatRoom = await API.graphql(
          graphqlOperation(chatRoomByName, {
            name: nameChatRoom,
          })
        );
        console.log("Q2 Done");
        try {
          chatRoomID = chatRoom.data.chatRoomByName.items[0].id;
        } catch {
          console.log("Chatroom does not exist");
          chatRoomID = null;
        }
      }

      var displayNameChat;
      if (chatRoomID == null) {
        //  1. Create a new Chat Room
        if (imageUris.length > 1) {
          // ask for chat name
          displayNameChat = chatName;
        } else {
          displayNameChat = names[0];
        }

        console.log("Will do Q3");
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: {
              lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16",
              name: nameChatRoom,
              displayNameChat: displayNameChat,
            },
          })
        );

        console.log("Q3 Done");

        if (!newChatRoomData.data) {
          console.log(" Failed to create a chat room");
          return;
        }

        const newChatRoom = newChatRoomData.data.createChatRoom;

        console.log("For loop of Q4s + adding user");

        //  3. Add authenticated user to the Chat Room
        API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: userInfo.attributes.sub,
              chatRoomID: newChatRoom.id,
            },
          })
        );

        for (let i = 0; i < usersID.length; i++) {
          // 2. Add `user` to the Chat Room
          API.graphql(
            graphqlOperation(createChatRoomUser, {
              input: {
                userID: usersID[i],
                chatRoomID: newChatRoom.id,
              },
            })
          );
        }

        console.log("All users Added");

        chatRoomID = newChatRoom.id;
      }

      navigation.navigate("ChatRoom", {
        id: chatRoomID,
        chatName: displayNameChat,
        memberNames: names,
        myID: userInfo.attributes.sub,
        imageUris: imageUris,
        otherUserIDs: ids,
      });
      setFlashMessage(false);
      setStateDisabled(false);
    } catch (e) {
      console.log(e);
      setFlashMessage(false);
      setStateDisabled(false);
    }
  };
  // Dialog box ##################################
  const showDialog = () => {
    if (usersID.length > 1) {
      setVisible(true);
    } else if (usersID.length == 0) {
      setVisibleAlert(true);
    } else {
      onClick();
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    if (chatName) {
      setVisible(false);
      onClick();
    }
  };

  const handleOkAlert = () => {
    setVisibleAlert(false);
  };
  // ####################################################################

  return (
    <TouchableWithoutFeedback onPress={showDialog} disabled={stateDisabled}>
      <View style={styles.createChatRoomButtonContainer}>
        <Text style={styles.creatChatRoomText}>Create ChatRoom</Text>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Chat Name</Dialog.Title>
          <Dialog.Description>Set group chat name</Dialog.Description>
          <Dialog.Input onChangeText={(name) => setChatName(name)} />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="OK" onPress={handleOk} />
        </Dialog.Container>
        <Dialog.Container visible={visibleAlert}>
          <Dialog.Title>Select Users!</Dialog.Title>
          <Dialog.Button label="OK" onPress={handleOkAlert} />
        </Dialog.Container>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateChatRoomButton;
