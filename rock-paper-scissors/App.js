import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Game from "./component/Game";

const App = () => {
  return (
    <View style={styles.container}>
      <Game></Game>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
});

export default App;
