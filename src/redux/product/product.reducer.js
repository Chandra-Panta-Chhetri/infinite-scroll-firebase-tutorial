import PRODUCT_ACTION_TYPES from "./product.action.types";

const INITIAL_STATE = {
  products: [],
  isFetchingProducts: false,
  productsPerPage: 6,
  lastVisibleDoc: null,
  hasMoreToFetch: true
};

const productReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.START_INITIAL_PRODUCTS_FETCH:
      return {
        ...prevState,
        isFetchingProducts: true,
        products: [],
        hasMoreToFetch: true,
        lastVisibleDoc: null
      };
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL:
    case PRODUCT_ACTION_TYPES.LOADING_MORE_PRODUCTS_FAIL:
    case PRODUCT_ACTION_TYPES.NO_MORE_PRODUCTS_TO_LOAD:
      return {
        ...prevState,
        isFetchingProducts: false,
        hasMoreToFetch: false
      };
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isFetchingProducts: false
      };
    case PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS:
      return {
        ...prevState,
        isFetchingProducts: true,
        productData: {}
      };
    case PRODUCT_ACTION_TYPES.LOADING_MORE_PRODUCTS_SUCCESS:
      return {
        ...prevState,
        isFetchingProducts: false,
        products: action.payload.updatedProducts,
        lastVisibleDoc: action.payload.lastVisibleDoc
      };
    default:
      return prevState;
  }
};

export default productReducer;
