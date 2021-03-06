import { AsyncStorage } from "react-native";
import { formatDeckResult } from "../util/helper";

export const FLASHCARDS_STORAGE_KEY = "FlashCards:storageData";

// Retorna todos os baralhos com seus títulos, perguntas, e respostas.
export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(formatDeckResult);
}

// Dado um único argumento id, ele retorna o baralho associado àquele id.
export function getDeck(title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(result => {
    const data = JSON.parse(result);
    return data[title];
  });
}

// Dado um único argumento title, ele adiciona-o aos baralhos.
export function saveDeck(title) {
  return AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({ [title]: { title, questions: [] } })
  );
}

// Dado dois argumentos, title e card, ele adiciona o cartão à lista de perguntas ao baralho com o título associado.
export function saveCardToDeck(title, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(result => {
    let data = JSON.parse(result);
    const arr = data[title].questions.concat([card]);
    data[title].questions = arr;

    return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
  });
}

// Dado um único argumento title, ele deleta o baralho e suas cartas.
export function deleteDeck(title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result);
      data[title] = undefined;
      delete data[title];
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    })
    .then(() => {
      return title;
    });
}

export function resetDecks() {
  return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY).then(() => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(formatDeckResult);
  });
}
