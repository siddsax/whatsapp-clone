import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { userContext } from "./context/context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

// Amplify.configure(config)
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
const randomImages = [
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [userInfo, setUserInfo] = useState();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  // run this snippet only when App is first mounted
  useEffect(() => {
    const askAudioPermission = async () => {
      const permission = await Audio.getPermissionsAsync();
      console.log(permission);
      if (!permission.granted) {
        alert("Hey! You have not enabled selected permissions");
        await Audio.requestPermissionsAsync();
      }
    };

    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      setUserInfo(userInfo);

      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        if (userData.data.getUser) {
          console.log("User is already registered in database");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "MewTwo is Hip",
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };

    askAudioPermission();
    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <userContext.Provider value={userInfo}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </userContext.Provider>
    );
  }
}

export default withAuthenticator(App);
