import types from "./types";

const receiveDecks = decks => ({
  type: types.RECEIVE_DECKS,
  decks
});

const addDeck = title => ({
  type: types.ADD_DECK,
  title
});

const deleteDeck = title => ({
  type: types.DELETE_DECK,
  title
});

export { receiveDecks, addDeck, deleteDeck };
