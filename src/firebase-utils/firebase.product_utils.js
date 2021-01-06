import { firestore } from "./firebase.config";
const productCollectionRef = firestore.collection("products");

export const executeQuery = async (query) => {
  const querySnapshot = await query.get();
  const queryDocSnapshots = querySnapshot.docs;
  return queryDocSnapshots;
};

export const executePaginatedQuery = async (paginatedQuery) => {
  const docSnapshots = await executeQuery(paginatedQuery);
  const lastVisibleDoc = docSnapshots[docSnapshots.length - 1];
  return { lastVisibleDoc, docSnapshots };
};

export const populateProductsFromSnapshots = (productsSnapshots) =>
  productsSnapshots.map((ps) => ({
    id: ps.id,
    ...ps.data()
  }));

export const excutePaginatedProductQuery = async (paginatedProductQuery) => {
  try {
    const {
      lastVisibleDoc,
      docSnapshots: productSnapshots
    } = await executePaginatedQuery(paginatedProductQuery);
    const products = populateProductsFromSnapshots(productSnapshots);
    return { products, lastVisibleDoc };
  } catch (err) {
    return { products: [], lastVisibleDoc: null };
  }
};

export const getProducts = async (productsPerPage) => {
  const paginatedProductsQuery = productCollectionRef
    .orderBy("price")
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    paginatedProductsQuery
  );
  return productsAndLastVisibleDoc;
};

export const getMoreProducts = async (lastVisibleDoc, productsPerPage) => {
  const nextProductsQuery = productCollectionRef
    .orderBy("price")
    .startAfter(lastVisibleDoc)
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    nextProductsQuery
  );
  return productsAndLastVisibleDoc;
};
