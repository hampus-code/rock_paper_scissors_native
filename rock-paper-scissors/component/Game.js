import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Game = () => {
  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.headerText}>The Game of</Text>
      <Text style={styles.headerText}>Rock, Paper & Scissors</Text>
      <View style={styles.space}></View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity>
            <Text style={styles.text}>Rock</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space}></View>
        <View style={styles.button}>
          <TouchableOpacity>
            <Text style={styles.text}>Paper</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space}></View>
        <View style={styles.button}>
          <TouchableOpacity>
            <Text style={styles.text}>Scissors</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerText: {
    fontSize: 30,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  space: {
    height: 20,
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default Game;
