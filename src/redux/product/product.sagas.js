import PRODUCT_ACTION_TYPES from "./product.action.types";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  initialProductsFetchFail,
  initialProductsFetchSuccess,
  loadingMoreProductsFail,
  loadingMoreProductsSuccess,
  noMoreProductsToLoad
} from "./product.actions";
import {
  getProducts,
  getMoreProducts
} from "../../firebase-utils/firebase.product_utils";
import {
  selectProductsPerPage,
  selectLastVisibleDoc
} from "./product.selectors";

function* fetchProducts() {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const { products, lastVisibleDoc } = yield getProducts(productsPerPage);
    if (!products.length) {
      return yield put(noMoreProductsToLoad());
    }
    yield put(initialProductsFetchSuccess(products, lastVisibleDoc));
  } catch (err) {
    yield put(
      initialProductsFetchFail("There was a problem displaying the products.")
    );
  }
}

function* fetchMoreProducts() {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const lastDoc = yield select(selectLastVisibleDoc);
    const { products: newProducts, lastVisibleDoc } = yield getMoreProducts(
      lastDoc,
      productsPerPage
    );
    if (!newProducts.length) {
      return yield put(noMoreProductsToLoad());
    }
    yield put(loadingMoreProductsSuccess(newProducts, lastVisibleDoc));
  } catch (err) {
    yield put(
      loadingMoreProductsFail("There was a problem loading more products.")
    );
  }
}

function* watchProductsFetchStart() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_INITIAL_PRODUCTS_FETCH,
    fetchProducts
  );
}

function* watchLoadMoreProducts() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS,
    fetchMoreProducts
  );
}

export default function* productSagas() {
  yield all([call(watchProductsFetchStart), call(watchLoadMoreProducts)]);
}
