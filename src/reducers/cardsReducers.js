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
    case types.DELETE_CARD: {
      const { pos } = action;

      //   let stateData = { ...state };
      //   stateData[title] = undefined;
      //   delete stateData[title];

      return state;
    }
    default:
      return state;
  }
};

export default cards;
