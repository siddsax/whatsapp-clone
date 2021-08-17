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
    fontSize: 20,
    //justifyContent: "space-around"
  },
  image: {
    justifyContent: "space-evenly",
    //flex: 1,
    alignItems: "center",
    //width: windowWidth * 0.2, //"20%",
    //height: windowWidth * 0.2, //"10%",
    width: 80,
    height: 80,
    //borderRadius: windowWidth * 0.1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "white",
  },
  clubhousePics: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: "5%",
    flexDirection: "row",
  },
  pendingMessagesBottomBar: {
    backgroundColor: Colors.CREAM_TOP,
    //width: windowWidth * 0.06,
    //height: windowWidth * 0.06,
    height: 32,
    width: 51,
    borderBottomRightRadius: 24,
    borderTopRightRadius: 24,
    //borderRadius: windowWidth * 0.03,
    // marginLeft: "5%",
    // marginRight: "10%",
    marginBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "60%",
    height: 30,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 7,
    color: "green",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  sliderContainer: {
    flex: 1,
    marginBottom: 3,
    flexDirection: "row",
  },

  recordButton: {
    height: 48,
    width: 77,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    backgroundColor: Colors.CREAM_TOP,
    //right: 0.01
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
    //flex: 1,
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
    fontSize: 20,
  },
  messageFlatListContainer: {
    alignItems: "flex-end",
    alignContent: "flex-end",
    flex: 0,
    flexDirection: "row",
    marginBottom: windowHeight * 0.02,
    height: windowWidth * 0.2,
  },
  messageItem: {
    borderRadius: windowWidth * 0.075,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageFlatListMessage: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.075,
    borderColor: "black",
    borderWidth: 3,
    backgroundColor: "green",
  },
  imageFlatListMessageAttention: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.075,
    borderColor: "red",
    borderWidth: 3,
  },
  imageFlatListMessageSelected: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.075,
    borderColor: Colors.CREAM_TOP,
    borderWidth: 3,
  },
});
