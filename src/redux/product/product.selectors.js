export const selectProductsPerPage = (state) => state.product.productsPerPage;

export const selectLastVisibleDoc = (state) => state.product.lastVisibleDoc;

export const selectProducts = (state) => state.product.products;

export const selectIsFetchingProducts = (state) =>
  state.product.isFetchingProducts;

export const selectHasMoreProductsToFetch = (state) =>
  state.product.hasMoreToFetch;
