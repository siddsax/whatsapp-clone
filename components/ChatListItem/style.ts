import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  lefContainer: {
    flexDirection: "row",
  },
  midContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    // justifyContent: "center",
    alignContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    flex: 0,
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: "grey",
  },
  time: {
    fontSize: 14,
    color: "grey",
  },
});

export default styles;
