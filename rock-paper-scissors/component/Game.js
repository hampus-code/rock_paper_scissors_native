import { StyleSheet, Text, View } from "react-native";

export default function Game() {
  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.headerText}>The Game of</Text>
      <Text style={styles.headerText}>Rock, Paper & Scissors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  space: {
    height: 20,
  },
});
