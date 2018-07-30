import types from "../actions/types";

const decks = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_DECKS: {
      const { decks } = action;

      const newState = {
        ...state,
        ...decks
      };

      return newState;
    }
    case types.GET_DECK: {
      const { deck } = action;

      return {
        ...state,
        ...deck
      };
    }
    case types.ADD_DECK: {
      const { title } = action;

      return {
        ...state,
        [title]: { title }
      };
    }
    case types.DELETE_DECK: {
      const { title } = action;

      let stateData = { ...state };
      stateData[title] = undefined;
      delete stateData[title];

      return stateData;
    }
    default:
      return state;
  }
};

export default decks;
