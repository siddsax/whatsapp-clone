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
  const { user, setFlashMessage, userInfo, chatUsers, setChatUsers } = props;
  const [stateDisabled, setStateDisabled] = useState(false);
  const [userSelected, setUserSelected] = useState(false);

  const navigation = useNavigation();

  const onClick = async () => {
    console.log(chatUsers);
    if (userSelected) {
      setUserSelected(false);
      const index = chatUsers.indexOf(user.id);
      chatUsers.splice(index, 1);
      setChatUsers(chatUsers);
    } else {
      chatUsers.push(user.id);
      setUserSelected(true);
      setChatUsers(chatUsers);
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
          <View style={styles.rightContainer}>
            {userSelected ? (
              <View style={styles.selectedCircle}></View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
