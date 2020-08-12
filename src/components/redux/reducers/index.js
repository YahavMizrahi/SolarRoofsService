import { combineReducers } from "redux";
import searchReducer from "../reducers/searchReducer";
import bldReducer from "../reducers/bldReducer";

export default combineReducers({
  valueSearch: searchReducer,
  mapGeometry: bldReducer,
});
