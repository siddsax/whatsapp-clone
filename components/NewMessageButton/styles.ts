import { StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    width: 77,
    height: 48,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    //borderRadius: 25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 0.1,
  }
})

export default styles;
