import { AsyncStorage } from "react-native";
import { FLASHCARDS_STORAGE_KEY } from "../api";

export function shuffle(arr) {
  let ctr = arr.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

export function formatDeckResult(results) {
  return results === null ? setDummyData() : JSON.parse(results);
}

function setDummyData() {
  const data = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  };

  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));

  return data;
}
