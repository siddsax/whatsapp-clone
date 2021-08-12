import React, { useContext } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import ChatListItem from "../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";

import NewMessageButton from "../components/NewMessageButton";
import { useEffect, useState } from "react";

import { getUser } from "./queries";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { onCreateChatRoom } from "../src/graphql/subscriptions";

export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  const isFocused = useIsFocused();
  const [chatRoomCount, setChatRoomCount] = useState(1);

  const propertyRetriever = (inp) => {
    return Date.parse(inp.chatRoom.lastMessage.updatedAt);
  };
  const fetchChatRooms = async () => {
    console.log("Fetching Chatrooms");
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const userData = await API.graphql(
        graphqlOperation(getUser, {
          id: userInfo.attributes.sub,
        })
      );

      var chats = userData.data.getUser.chatRoomUser.items;
      setChatRoomCount(chats.length);
      setChatRooms(chats);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("Back to chat rooms!!");
    if (isFocused) {
      fetchChatRooms();
    }
  }, [isFocused]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateChatRoom)
    ).subscribe({
      next: () => {
        fetchChatRooms();
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {chatRoomCount == 0 ? (
        <View style={styles.statusPopUp}>
          <Text style={styles.flashMessageStyle}>{"Create Chatrooms!!"}</Text>
        </View>
      ) : (
        <Text></Text>
      )}
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms.sort(
          (a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
        )}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 10,
  },
  flashMessageStyle: {
    fontWeight: "bold",
    color: "black",
  },
});
