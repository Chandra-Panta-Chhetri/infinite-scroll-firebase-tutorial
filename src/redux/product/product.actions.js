import PRODUCT_ACTION_TYPES from "./product.action.types";

export const startInitialProductsFetch = () => ({
  type: PRODUCT_ACTION_TYPES.START_INITIAL_PRODUCTS_FETCH
});

export const initialProductsFetchFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL,
  payload: errorMsg
});

export const initialProductsFetchSuccess = (products, lastVisibleDoc) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_SUCCESS,
  payload: { products, lastVisibleDoc }
});

export const startLoadingMoreProducts = () => ({
  type: PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS
});

export const loadingMoreProductsFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.LOADING_MORE_PRODUCTS_FAIL,
  payload: errorMsg
});

export const loadingMoreProductsSuccess = (newProducts, lastVisibleDoc) => ({
  type: PRODUCT_ACTION_TYPES.LOADING_MORE_PRODUCTS_SUCCESS,
  payload: { newProducts, lastVisibleDoc }
});

export const noMoreProductsToLoad = () => ({
  type: PRODUCT_ACTION_TYPES.NO_MORE_PRODUCTS_TO_LOAD
});
