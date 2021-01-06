import { all, call } from "redux-saga/effects";
import productSagas from "./product/product.sagas";

function* rootSaga() {
  yield all([call(productSagas)]);
}

export default rootSaga;
