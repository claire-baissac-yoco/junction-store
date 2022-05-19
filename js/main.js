import { doFetch } from "./utils.js";
import { API_URL } from "./shared.js";
import { displayProducts } from "./displayProducts.js";
import { getNumberItemsInCart } from "./shoppingCart.js";

let products = [];
let currentNumberOfProducts = 3;
const incrementProducts = 3;

const showMoreButton = document.getElementById("show-more-button");
showMoreButton.addEventListener("click", () => {
  handleShowMore();
});

document.getElementById("cart-items").textContent = getNumberItemsInCart();

/**
 * Displays the products on the main page
 */
async function main() {
  products = await doFetch(API_URL);
  displayProducts(products.slice(0, currentNumberOfProducts));
}

/**
 * Displays more products to the user
 */
function handleShowMore() {
  currentNumberOfProducts += incrementProducts;
  if (currentNumberOfProducts > products.length) {
    showMoreButton.disabled = true;
  }
  displayProducts(products.slice(0, currentNumberOfProducts));
}

main();
