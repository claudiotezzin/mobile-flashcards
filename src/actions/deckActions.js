import types from "./types";

const receiveDecks = decks => ({
  type: types.RECEIVE_DECKS,
  decks
});

const receiveSingleDeck = deck => ({
  type: types.RECEIVE_SINGLE_DECK,
  deck
});

const addDeck = title => ({
  type: types.ADD_DECK,
  title
});

const deleteDeck = title => ({
  type: types.DELETE_DECK,
  title
});

export { receiveDecks, receiveSingleDeck, addDeck, deleteDeck };
