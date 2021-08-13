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
import * as WebBrowser from "expo-web-browser";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

function App(props) {
  // const {
  //   oAuthUser,
  //   oAuthError,
  //   hostedUISignIn,
  //   facebookSignIn,
  //   googleSignIn,
  //   amazonSignIn,
  //   customProviderSignIn,
  //   signOut,
  // } = props;
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  //  Notification ////////////////////

  ///////////////////////////////////

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  // run this snippet only when App is first mounted
  useEffect(() => {
    const askAudioPermission = async () => {
      const permission = await Audio.getPermissionsAsync();
      console.log(permission);
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

        var token = await registerForPushNotificationsAsync(true);

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "MewTwo is Hip",
          token: token,
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };

    askAudioPermission();
    fetchUser();
  }, []);

  // useEffect(() => {
  //   Hub.listen("auth", ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "signIn":
  //         getUser().then((userData) => setUser(userData));
  //         break;
  //       case "signOut":
  //         setUser(null);
  //         break;
  //       case "signIn_failure":
  //       case "cognitoHostedUI_failure":
  //         console.log("Sign in failure", data);
  //         break;
  //     }
  //   });

  //   getUser().then((userData) => setUser(userData));
  // }, []);

  // function getUser() {
  //   return Auth.currentAuthenticatedUser()
  //     .then((userData) => userData)
  //     .catch(() => console.log("Not signed in"));
  // }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <View>
      //   <Text>User: {user ? JSON.stringify(user.attributes) : "None"}</Text>
      //   {user ? (
      //     <Button title="Sign Out" onPress={() => Auth.signOut()} />
      //   ) : (
      //     <Button
      //       title="Federated Sign In"
      //       onPress={() => Auth.federatedSignIn()}
      //     />
      //   )}
      // </View>

      // <View style={{ marginTop: "30%" }}>
      //   <Text>
      //     User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : "None"}
      //   </Text>
      //   {oAuthUser ? (
      //     <Button title="Sign Out" onPress={signOut} />
      //   ) : (
      //     <>
      //       {/* Go to the Cognito Hosted UI */}
      //       <Button title="Cognito" onPress={hostedUISignIn} />

      //       {/* Go directly to a configured identity provider */}
      //       <Button title="Facebook" onPress={facebookSignIn} />
      //       <Button title="Google" onPress={googleSignIn} />
      //       <Button title="Amazon" onPress={amazonSignIn} />

      //       {/* e.g. for OIDC providers */}
      //       <Button
      //         title="Yahoo"
      //         onPress={() => customProviderSignIn("Yahoo")}
      //       />
      //     </>
      //   )}
      // </View>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
// export default withOAuth(App);
