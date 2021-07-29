import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    // alignItems: "flex-end",
    justifyContent: "center",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  // buttonContainer: {
  //   backgroundColor: Colors.light.tint,
  //   borderRadius: 25,
  //   width: 50,
  //   height: 50,
  //   margin: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  buttonContainerPressed: {
    backgroundColor: "red",
    borderRadius: 25,
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerUnPressed: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
