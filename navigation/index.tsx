import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ColorSchemeName,
  View,
  Text,
  Button,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";

import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import ContactsScreen from "../screens/ContactsScreen";
import { Auth } from "aws-amplify";
import { Dropdown } from "react-native-material-dropdown";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const signOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  // Then in your render method.
  //
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.CREAM_TOP,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: "black",
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "black",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: "WhatsApp",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 60,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              {/* <Octicons name="search" size={22} color={"white"} /> */}
              <TouchableHighlight
                onPress={signOut} // style={styles.btnClickContain}
                underlayColor="#042417"
              >
                <View>
                  <MaterialCommunityIcons
                    // name="power-off"
                    name="logout"
                    size={22}
                    color={"black"}
                  />
                </View>
              </TouchableHighlight>

              {/* <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              /> */}
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                // width: 100,
                // justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <Image
                source={{ uri: route.params.imageUri }}
                style={styles.image}
              />
              {/* <FontAwesome5 name="video" size={22} color={"black"} />
              <MaterialIcons name="call" size={22} color={"black"} /> */}
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"black"}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    // justifyContent: "flex-start",
    // flex: 1,
    alignItems: "flex-start",
    width: "120%",
    height: "100%",
    borderRadius: 150 / 2,
    // overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
});
