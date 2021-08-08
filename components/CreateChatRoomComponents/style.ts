import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Colors from "../../constants/Colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  lefContainer: {
    flexDirection: "row",
    width: "100%",
  },
  midContainer: {
    justifyContent: "space-around",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    alignContent: "flex-end",
    width: "100%",
    marginRight: "5%",
  },
  selectedCircle: {
    backgroundColor: "green",
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
    borderRadius: windowWidth * 0.025,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    color: "grey",
  },
  createChatRoomButtonContainer: {
    // flex: 1,
    width: "40%",
    height: "5%",
    // opacity: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: "green",
    // marginLeft: "30%",
    // marginRight: "30%",
    marginBottom: "10%",
    // marginTop: 10,
  },
  creatChatRoomText: {
    alignContent: "center",
    justifyContent: "center",
  },
});

export default styles;
