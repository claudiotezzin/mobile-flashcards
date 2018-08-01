import { combineReducers } from "redux";
import decks from "./decksReducers";
import cards from "./cardsReducers";

export default combineReducers({
  decks,
  cards
});
