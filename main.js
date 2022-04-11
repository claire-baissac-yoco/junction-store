import { doFetch } from "./utils.js";
import { API_URL } from "./shared.js";
import { displayProducts } from "./displayProducts.js";

async function main() {
  const products = await doFetch(API_URL);
  console.log(products);
  displayProducts(products);
}

main();
