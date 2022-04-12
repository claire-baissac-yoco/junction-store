import { displayProduct } from "./displayProduct.js";
import { API_URL } from "./shared.js";
import { doFetch } from "./utils.js";

async function product() {
  const cartItems = document.getElementById("cart-items");
  cartItems.textContent = localStorage.getItem("cart").split(",").length;
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const currentProduct = await doFetch(API_URL + `/product/${productId}`);
  console.log(currentProduct);
  displayProduct(currentProduct);
}

product();
