import { doFetch } from "./utils.js";
import { API_URL } from "./shared.js";
import { displayProducts } from "./displayProducts.js";

let products = [];
let currentNumberOfProducts = 3;
const incrementProducts = 3;

const showMoreButton = document.getElementById("show-more-button");
showMoreButton.addEventListener("click", () => {
  handleShowMore();
});

const cartItems = document.getElementById("cart-items");
const cart = localStorage.getItem("cart");
if (cart) {
  cartItems.textContent = cart.split(",").length;
}

async function main() {
  products = await doFetch(API_URL);
  console.log(products.slice(0, currentNumberOfProducts));
  displayProducts(products.slice(0, currentNumberOfProducts));
}

function handleShowMore() {
  console.log("handle show more");
  currentNumberOfProducts += incrementProducts;
  if (currentNumberOfProducts > products.length) {
    showMoreButton.disabled = true;
  }
  displayProducts(products.slice(0, currentNumberOfProducts));
}

main();
