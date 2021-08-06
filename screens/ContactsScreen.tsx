import * as React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { View } from "../components/Themed";
import ContactListItem from "../components/CreateChatRoomButton";

import { listUsers } from "../src/graphql/queries";
import { useEffect, useState } from "react";
import Colors from "../constants/Colors";








export default function ContactsScreen() {
  const [users, setUsers] = useState([]);
  const [flashMessage, setFlashMessage] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const authUserNfetchUsers = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const usersData = await API.graphql(
        graphqlOperation(listUsers, {
          filter: {
            id: {
              ne: userInfo.attributes.sub,
            },
          },
        })
      );
      setUsers(usersData.data.listUsers.items);
      setUserInfo(userInfo);
    };

    authUserNfetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {flashMessage ? (
        <View style={styles.statusPopUp}>
          <Text style={styles.flashMessageStyle}>{"Loading Chatroom"}</Text>
        </View>
      ) : (
        <Text></Text>
      )}
      <FlatList
        style={{ width: "100%" }}
        data={users}
        renderItem={({ item }) => (
          <ContactListItem
            user={item}
            setFlashMessage={setFlashMessage}
            userInfo={userInfo}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
