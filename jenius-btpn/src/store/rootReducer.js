import { combineReducers } from "redux";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  user: productReducer,
});
export default rootReducer;
