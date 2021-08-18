import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { userContext } from "./context/context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Auth, API, graphqlOperation, Hub } from "aws-amplify";
import { getUser } from "./src/graphql/queries";
import { createUser, updateUser } from "./src/graphql/mutations";

import { withAuthenticator, withOAuth } from "aws-amplify-react-native";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import { LogBox, Text, Button, View, Linking, Platform } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["Notification registration failed"]);

import * as WebBrowser from "expo-web-browser";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";
import * as Updates from "expo-updates";
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// Amplify.configure(config)
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
const randomImages = [
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-1.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-4.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-5.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-7.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-8.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
];

// async function urlOpener(url, redirectUrl) {
//   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
//     url,
//     redirectUrl
//   );

//   if (type === "success" && Platform.OS === "ios") {
//     WebBrowser.dismissBrowser();
//     return Linking.openURL(newUrl);
//   }
// }

const _handleNotification = (notification: any) => {
  console.log(notification);
  // this.setState({ notification: notification });
};

const _handleNotificationResponse = (response: any) => {
  console.log(response);
};

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const checForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        await Updates.reloadAsync();
      }
    } catch (e) {
      // handle or log error
    }
  };

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  // run this snippet only when App is first mounted
  useEffect(() => {
    const askAudioPermission = async () => {
      const permission = await Audio.getPermissionsAsync();
      if (!permission.granted) {
        await Audio.requestPermissionsAsync();
      }
    };

    Notifications.addNotificationReceivedListener(_handleNotification);

    Notifications.addNotificationResponseReceivedListener(
      _handleNotificationResponse
    );

    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // setUserInfo(userInfo);

      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        if (userData.data.getUser) {
          console.log("User is already registered in database");
          if (userData.data.getUser.token == null) {
            var token = await registerForPushNotificationsAsync(true);
            try {
              API.graphql(
                graphqlOperation(updateUser, {
                  input: { id: userInfo.attributes.sub, token: token },
                })
              );
            } catch (e) {
              console.log(e);
            }
          } else {
            await registerForPushNotificationsAsync(false);
          }
          return;
        }

        console.log("##########");
        var tokenNew;
        try {
          tokenNew = await registerForPushNotificationsAsync(true);
        } catch (e) {
          tokenNew = null;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "MewTwo is Hip",
          token: tokenNew,
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };

    checForUpdate();
    askAudioPermission();
    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
