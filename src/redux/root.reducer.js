import productReducer from "./product/product.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  product: productReducer
});
