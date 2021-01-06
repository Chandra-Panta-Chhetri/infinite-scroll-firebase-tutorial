import React, { useEffect } from "react";
import "./App.css";

import { connect } from "react-redux";
import {
  selectHasMoreProductsToFetch,
  selectIsFetchingProducts,
  selectProducts
} from "./redux/product/product.selectors";
import {
  startInitialProductsFetch,
  startLoadingMoreProducts
} from "./redux/product/product.actions";
import usePaginationOnIntersection from "./hooks/usePaginationOnIntersection.hook";

function App({
  products,
  fetchProducts,
  fetchMoreProducts,
  hasMoreProductsToFetch,
  isFetchingProducts
}) {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreProducts,
    isFetchingProducts,
    hasMoreProductsToFetch
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section>
      <h1 class="title">Products</h1>
      <div class="product-container">
        {(products || []).map((product, index) => (
          <div
            key={product.id}
            class="product"
            ref={
              index + 1 === products.length
                ? fetchMoreOnIntersection
                : undefined
            }
          >
            <span>Name: {product.name}</span>
            <span>Price: ${product.price}</span>
          </div>
        ))}
        {isFetchingProducts && <p>Loading...</p>}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  products: selectProducts(state),
  isFetchingProducts: selectIsFetchingProducts(state),
  hasMoreProductsToFetch: selectHasMoreProductsToFetch(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(startInitialProductsFetch()),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
