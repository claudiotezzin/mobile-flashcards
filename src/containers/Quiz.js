import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import CardFlip from "react-native-card-flip";
import { white, black, green, red, primary } from "../util/colors";
import { getDeck } from "../api";
import { receiveSingleDeck } from "../actions";
import {
  shuffle,
  clearLocalNotification,
  setLocalNotification
} from "../util/helper";

class Quiz extends Component {
  state = {
    isShowingAnswer: false,
    currentQuestionIndex: 1,
    correctAnswersCount: 0,
    ready: false
  };

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    const title = navigation.state.params.deckTitle;

    //Reset notification
    clearLocalNotification().then(setLocalNotification);

    getDeck(title)
      .then(deck => {
        return dispatch(receiveSingleDeck(deck));
      })
      .then(() => this.setState({ ready: true }));
  }

  _checkAnswer = () => {
    this.card.flip();
    this.setState({ isShowingAnswer: true });
  };

  _correctAnswer = () => {
    this.card.flip();
    this.setState(prevState => {
      return {
        isShowingAnswer: false,
        correctAnswersCount: prevState.correctAnswersCount + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      };
    });
  };

  _wrongAnswer = () => {
    this.card.flip();
    this.setState(prevState => {
      return {
        isShowingAnswer: false,
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      };
    });
  };

  render() {
    const {
      isShowingAnswer,
      currentQuestionIndex,
      correctAnswersCount,
      ready
    } = this.state;
    const { cards, navigation } = this.props;

    if (!ready) {
      return <ActivityIndicator style={{ marginTop: 30 }} />;
    }

    if (currentQuestionIndex > cards.length) {
      const percentage = ((correctAnswersCount * 100) / cards.length).toFixed(
        2
      );
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.bigTitle}>CONGRATULATIONS</Text>
            <Text style={styles.finalMessage}>
              You answered {percentage}% of the questions correctly.
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: white }]}
                onPress={() =>
                  this.setState({
                    isShowingAnswer: false,
                    currentQuestionIndex: 1,
                    correctAnswersCount: 0
                  })
                }
              >
                <Text style={[styles.buttonLabel, { color: black }]}>
                  Restart Quiz
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: black }]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonLabel}>Back To Deck</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    const currentQuestion = cards[currentQuestionIndex - 1].question;
    const currentAnswer = cards[currentQuestionIndex - 1].answer;

    return (
      <View style={styles.container}>
        <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
          <View style={[styles.card, styles.cardFront]}>
            <Text style={styles.subtitle}>
              {currentQuestionIndex} de {cards.length}
            </Text>
            <View style={styles.questionContainer}>
              <Text style={[styles.title, { color: white }]}>
                {currentQuestion}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: black,
                    opacity: isShowingAnswer ? 0.2 : 1
                  }
                ]}
                disabled={isShowingAnswer}
                onPress={this._checkAnswer}
              >
                <Text style={[styles.buttonLabel, { color: white }]}>
                  Check Answer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: green,
                    opacity: !isShowingAnswer ? 0.2 : 1
                  }
                ]}
                disabled={!isShowingAnswer}
              >
                <Text style={styles.buttonLabel}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: red,
                    opacity: !isShowingAnswer ? 0.2 : 1
                  }
                ]}
                disabled={!isShowingAnswer}
              >
                <Text style={styles.buttonLabel}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.card, styles.cardBack]}>
            <Text style={[styles.subtitle, { color: black }]}>RESPOSTA</Text>
            <View style={styles.questionContainer}>
              <Text style={[styles.title, { color: black }]}>
                {currentAnswer}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: black,
                    opacity: isShowingAnswer ? 0.2 : 1
                  }
                ]}
                disabled={isShowingAnswer}
              >
                <Text style={[styles.buttonLabel, { color: white }]}>
                  Check Answer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: green,
                    opacity: !isShowingAnswer ? 0.2 : 1
                  }
                ]}
                disabled={!isShowingAnswer}
                onPress={this._correctAnswer}
              >
                <Text style={styles.buttonLabel}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: red,
                    opacity: !isShowingAnswer ? 0.2 : 1
                  }
                ]}
                disabled={!isShowingAnswer}
                onPress={this._wrongAnswer}
              >
                <Text style={styles.buttonLabel}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardFlip>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    width: 340,
    height: 490,
    borderRadius: Platform.OS === "ios" ? 16 : 8
  },
  card: {
    width: 340,
    height: 490,
    elevation: 6,
    backgroundColor: white,
    borderTopRightRadius: Platform.OS === "ios" ? 16 : 8,
    borderTopLeftRadius: Platform.OS === "ios" ? 16 : 8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.8,
    alignItems: "center"
  },
  cardFront: {
    backgroundColor: black
  },
  cardBack: {
    backgroundColor: white
  },
  subtitle: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
    color: white
  },
  questionContainer: {
    alignItems: "center",
    padding: 15,
    minHeight: 120
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
    color: black,
    backgroundColor: "transparent"
  },
  bigTitle: {
    textAlign: "center",
    alignSelf: "center",
    color: black,
    fontSize: 30,
    padding: 20,
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  finalMessage: {
    textAlign: "center",
    alignSelf: "center",
    color: primary,
    fontSize: 24,
    padding: 30,
    fontWeight: "bold"
  },
  buttonsContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  },
  buttonLabel: {
    fontSize: 26,
    fontWeight: "bold",
    color: white
  }
});

function mapStateToProps({ decks }, ownProps) {
  const { navigation } = ownProps;

  return {
    cards: decks[navigation.state.params.deckTitle].questions
  };
}

export default connect(mapStateToProps)(Quiz);
