import types from "../actions/types";

const cards = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_CARDS: {
      const { cards } = action;

      //Always return a new list of cards to do not duplicate
      return [...cards];
    }
    case types.ADD_CARD: {
      const { card } = action;

      return [...state, card];
    }
    default:
      return state;
  }
};

export default cards;
