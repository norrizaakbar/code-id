import { ADD, DETAIL, FETCH_PRODUCTS } from "./actionTypes";

const initialState = { users: [], user: {} };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD:
      return {
        ...state,
        users: state.users.concat([action.payload]),
      };
    case DETAIL:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default productReducer;
