import { Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  pendingMessages: {
    backgroundColor: "red",
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: windowWidth * 0.03,
    left: windowWidth * 0.07,
    top: -windowWidth * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },

  pendingMessagesText: {
    fontWeight: "bold",
  },
  image: {
    // justifyContent: "flex-start",
    // flex: 1,
    alignItems: "flex-start",
    width: windowWidth * 0.2, //"20%",
    height: windowWidth * 0.2, //"10%",
    borderRadius: windowWidth * 0.1,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "red",
  },
  clubhousePics: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  clubhousePicsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  clubhousePicsListItem: {
    margin: "5%",
    alignItems: "center",
    fontWeight: "bold",
  },
  clubhousePicsListItemText: {
    fontWeight: "bold",
    margin: 4,
  },
  // Bottom Bar ######################################
  bottomBar: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "flex-end",
    flex: 0,
    marginBottom: "10%",
    flexDirection: "row",
  },
  pendingMessagesBottomBar: {
    backgroundColor: "red",
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: windowWidth * 0.03,
    marginBottom: 15,
    // marginLeft: "5%",
    // marginRight: "10%",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "60%",
    height: 40,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 5,
  },

  recordButton: {
    marginLeft: 5,
  },
  paceBar: {
    justifyContent: "flex-start",
    marginBottom: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  // Bottom Bar ######################################

  // Navigation Bar ######################################
  audioNavigation: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  goBack: {
    // flex: 1,
    marginRight: "20%",
  },
  goAhead: {
    marginLeft: "20%",
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
  },
  // Navigation Bar ######################################
  flashMessageStyle: {
    fontWeight: "bold",
    color: "black",
  },
});
