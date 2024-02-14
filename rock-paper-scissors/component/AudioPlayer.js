import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";

export default function audioPlayer() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    //Async function som hanterar uppspelningen av mp3-filen
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/Sound/gotthemesong.mp3")
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {" "}
      {
        {
          /* Knapp för att spela och pausa ljudet från mp3-filen */
        }
      }
      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Text style={styles.text}>
          {isPlaying ? "Pause Song" : "Play Song"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 2,
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
