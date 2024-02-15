import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AudioPlayer from "../component/AudioPlayer";
import { getTime } from "../component/FetchTime";

//Ska alla components importeras till App.js? Eller går det bra att det är till Game.js?
//Fråga Onur(?) eller Marcus
//I readme, behövs det skrivas installera npm som instruktion?

const Game = () => {
  const [gameStarted, setGamestarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerWonMessage, setPlayerWonMessage] = useState(null);
  const [computerWonMessage, setComputerWonMessage] = useState(null);
  const [buttonsDisable, setButtonsDisable] = useState(false); //useState för att få knappar att sluta fungera

  const [currentTime, setCurrentTime] = useState(null);

  //Använder useEffect för att hämta aktuellt datum och tid
  useEffect(() => {
    getTime().then((data) => {
      setCurrentTime(data.datetime);
    });
  }, []);

  const typeOfChoices = ["Rock", "Paper", "Scissors"];

  //Tar fram ett slumpat val mellan rock, paper och scissors åt datorn
  const getRandomComputerChioce = () => {
    const randomIndex = Math.floor(Math.random() * typeOfChoices.length);
    return typeOfChoices[randomIndex];
  };

  //jämför valen som spelare och dator gör för att kunna avgöra vem som får poäng
  const getPlayerChoice = (playerChoice) => {
    const computerChoice = getRandomComputerChioce();

    // if-sats för alla val där spelaren och datorn vinner
    if (
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
      setPlayerScore((scoreUpdate) => scoreUpdate + 1); // uppdaterar spelarens ställning med en poäng
    } else if (
      (playerChoice === "Rock" && computerChoice === "Paper") ||
      (playerChoice === "Paper" && computerChoice === "Scissors") ||
      (playerChoice === "Scissors" && computerChoice === "Rock")
    ) {
      setComputerScore((scoreUpdate) => scoreUpdate + 1); // uppdaterar datorns ställning med en poäng
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
      setButtonsDisable(false); //Aktiverar knapparna igen så man kan spela spelet igen
    };

    setComputerChoice(computerChoice);
    setPlayerChoice(playerChoice);
    setGamestarted(true); // ser till så att spelet startar
  };

  // här nollas spelarens och datorns poäng och spelet startar på så sätt om när någon vinner med 2-1 eller 2-0
  useEffect(() => {
    if (
      (playerScore === 2 && computerScore === 1) ||
      (playerScore === 2 && computerScore === 0)
    ) {
      setPlayerWonMessage("Player won! Restart game!"); // meddelande ifall spelaren vinner
      setButtonsDisable(true); //När någon vinner så avaktiveras knapparna för att spela
    }

    if (
      (playerScore === 1 && computerScore === 2) ||
      (playerScore === 0 && computerScore === 2)
    ) {
      setComputerWonMessage("Computer won! Restart game!"); // meddelande ifall datorn vinner
      setButtonsDisable(true); //När någon vinner så avaktiveras knapparna för att spela
    }
  }, [playerScore, computerScore]);

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
      <View style={styles.container}>
        {currentTime && <Text>Current Time: {currentTime}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  headerText: {
    fontSize: 30,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 20,
  },
  //Ger utrymme mellan bland annat text och knapparna
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
