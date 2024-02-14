import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import AudioPlayer from "../component/AudioPlayer";

const Game = () => {
  const [gameStarted, setGamestarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerWonMessage, setPlayerWonMessage] = useState(null);
  const [computerWonMessage, setComputerWonMessage] = useState(null);
  const [buttonsDisable, setButtonsDisable] = useState(false);

  const typeOfChoices = ["Rock", "Paper", "Scissors"];

  const getRandomComputerChioce = () => {
    const randomIndex = Math.floor(Math.random() * typeOfChoices.length);
    return typeOfChoices[randomIndex];
  }; //Tar fram ett slumpat val mellan rock, paper och scissors åt datorn

  const getPlayerChoice = (playerChoice) => {
    //jämför valen som spelare och dator gör för att kunna avgöra vem som får poäng
    const computerChoice = getRandomComputerChioce();

    if (
      // if-sats för alla val där spelaren vinner
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
      setPlayerScore((scoreUpdate) => scoreUpdate + 1); // uppdaterar spelarens ställning med en poäng
    } else if (
      (playerChoice === "Rock" && computerChoice === "Paper") || // if-sats för alla val där datorn vinner
      (playerChoice === "Paper" && computerChoice === "Scissors") ||
      (playerChoice === "Scissors" && computerChoice === "Rock")
    ) {
      setComputerScore((scoreUpdate) => scoreUpdate + 1); // uppdaterar datorns ställning med en poäng
    }

    if (
      // här nollas spelarens och datorns poäng och spelet startar på så sätt om ifall spelaren vinner med 2-1 eller 3-0
      (playerScore === 2 && computerScore === 1) ||
      (playerScore === 3 && computerScore === 0)
    ) {
      /* setPlayerScore(0);
      setComputerScore(0); */
      setPlayerWonMessage("Player won! Restart game!"); // meddelande ifall spelaren vinner
      setButtonsDisable(true);
    }

    if (
      // här nollas spelarens och datorns poäng och spelet startar på så sätt om ifall datorn vinner med 2-1 eller 3-0
      (playerScore === 1 && computerScore === 2) ||
      (playerScore === 0 && computerScore === 3)
    ) {
      /* setPlayerScore(0);
      setComputerScore(0); */
      setComputerWonMessage("Computer won! Restart game!"); // meddelande ifall datorn vinner
      setButtonsDisable(true);
    }

    //function för att starta om hela spelet
    setRestartGame = () => {
      setGamestarted(false);
      setPlayerScore(0);
      setComputerScore(0);
      setPlayerChoice(null);
      setComputerChoice(null);
      setPlayerWonMessage(null);
      setComputerWonMessage(null);
      setButtonsDisable(false);
    };

    setComputerChoice(computerChoice);
    setPlayerChoice(playerChoice);
    setGamestarted(true); // ser till så att spelet startar
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <Text style={styles.headerText}>The Game of</Text>
      <Text style={styles.headerText}>Rock, Paper & Scissors</Text>
      <View style={styles.space}></View>
      <Text style={styles.text}>Choose your option:</Text>
      <View style={styles.space}></View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity //Knapp för att välja "Rock"
            onPress={() => getPlayerChoice("Rock")}
            disabled={buttonsDisable}
          >
            <Text style={styles.buttonText}>Rock</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space}></View>
        <View style={styles.button}>
          <TouchableOpacity //Knapp för att välja "Paper"
            onPress={() => getPlayerChoice("Paper")}
            disabled={buttonsDisable}
          >
            <Text style={styles.buttonText}>Paper</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space}></View>
        <View style={styles.button}>
          <TouchableOpacity //Knapp för att välja "Scissors"
            onPress={() => getPlayerChoice("Scissors")}
            disabled={buttonsDisable}
          >
            <Text style={styles.buttonText}>Scissors</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.space}></View>
      <Text style={styles.text}>You chose: {playerChoice}</Text>
      {/* Här visas valet som spelaren gjorde, alltså knappen spelare valde */}
      <View style={styles.space}></View>
      <Text style={styles.text}>Your score: {playerScore}</Text>
      {/* Här visas spelarens poäng */}
      <View style={styles.space}></View>
      <Text style={styles.text}>Computer chose: {computerChoice}</Text>
      {/* Här visas valet som datorn gjorde, alltså det slumpade valet*/}
      <View style={styles.space}></View>
      <Text style={styles.text}>Computer score: {computerScore}</Text>
      {/* Här visas datorns poäng */}
      <View style={styles.space}></View>
      <Text style={styles.text}>
        Who won?
        {/* Beroende på vem som vann så ska rätt meddelande visas */}
      </Text>
      <Text style={styles.text}>
        {playerWonMessage || computerWonMessage}
        {/* Beroende på vem som vann så ska rätt meddelande visas */}
      </Text>
      <View style={styles.space}></View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => setRestartGame()}>
          <Text style={styles.buttonText}>Restart Game</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <AudioPlayer />
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
  text: {
    fontSize: 20,
  },
  space: {
    height: 15,
  },
  button: {
    borderWidth: 1,
    backgroundColor: "coral",
    borderRadius: 4,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default Game;
