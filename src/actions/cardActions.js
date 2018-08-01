import types from "./types";

const receiveCards = cards => ({
  type: types.RECEIVE_CARDS,
  cards
});

const addCard = card => ({
  type: types.ADD_CARD,
  card
});

const deleteCard = pos => ({
  type: types.DELETE_CARD,
  pos
});

export { receiveCards, addCard, deleteCard };
