import types from "./types";

const receiveCards = cards => ({
  type: types.RECEIVE_CARDS,
  cards
});

const addCard = card => ({
  type: types.ADD_CARD,
  card
});

export { receiveCards, addCard };
