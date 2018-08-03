import types from "../actions/types";

const decks = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_DECKS: {
      const { decks } = action;

      return {
        ...decks
      };
    }
    case types.RECEIVE_SINGLE_DECK: {
      const { deck } = action;

      return {
        ...state,
        [deck.title]: deck
      };
    }
    case types.ADD_DECK: {
      const { title } = action;

      return {
        ...state,
        [title]: { title, questions: [] }
      };
    }
    case types.DELETE_DECK: {
      const { title } = action;

      let stateData = { ...state };
      stateData[title] = undefined;
      delete stateData[title];

      return stateData;
    }
    case types.SAVE_CARD: {
      const { card, title } = action;

      const arr = state[title].questions.concat([card]);

      return {
        ...state,
        [title]: { title, questions: arr }
      };
    }
    default:
      return state;
  }
};

export default decks;
