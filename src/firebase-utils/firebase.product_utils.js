import { firestore } from "./firebase.config";
const productCollectionRef = firestore.collection("products");

export const executePaginatedQuery = async (paginatedQuery) => {
  const querySnapshot = await paginatedQuery.get();
  const docSnapshots = querySnapshot.docs;
  const lastVisibleDoc = docSnapshots[docSnapshots.length - 1];
  return { lastVisibleDoc, docSnapshots };
};

export const excutePaginatedProductQuery = async (paginatedProductQuery) => {
  try {
    const {
      lastVisibleDoc,
      docSnapshots: productSnapshots
    } = await executePaginatedQuery(paginatedProductQuery);
    const products = productSnapshots.map((ps) => ({
      id: ps.id,
      ...ps.data()
    }));
    return { products, lastVisibleDoc };
  } catch (err) {
    return { products: [], lastVisibleDoc: null };
  }
};

export const getProducts = async (productsPerPage) => {
  const paginatedProductsQuery = productCollectionRef.limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    paginatedProductsQuery
  );
  return productsAndLastVisibleDoc;
};

export const getMoreProducts = async (lastVisibleDoc, productsPerPage) => {
  const nextProductsQuery = productCollectionRef
    .startAfter(lastVisibleDoc)
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    nextProductsQuery
  );
  return productsAndLastVisibleDoc;
};
