import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Appearance,
} from "react-native";
import Game from "./component/Game";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

const App = () => {
  //useState för att hantera Light Mode/Dark Mode
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  //Function för att bestämma om det är Light Mode eller Dark Mode som visas
  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newColorScheme);
  };

  //Variabler som innehåller färgerna för Light Mode och Dark Mode
  const DARK_COLORS = ["#4c669f", "#3b5998", "#192f6a"];
  const LIGHT_COLORS = ["#aa4b6b", "#6b6b83", "#3b8d99"];

  return (
    <LinearGradient
      colors={colorScheme === "light" ? LIGHT_COLORS : DARK_COLORS}
      style={styles.container}
    >
      <TouchableOpacity onPress={toggleColorScheme} style={styles.button}>
        <Text style={styles.text}>
          Switch to {colorScheme === "dark" ? "Light" : "Dark"} Mode
        </Text>
      </TouchableOpacity>
      <View>
        <Game></Game>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  button: {
    borderWidth: 1,
    backgroundColor: "coral",
    borderRadius: 4,
    padding: 10,
    marginHorizontal: 10,
  },
  text: {
    color: "white",
  },
});

export default App;
