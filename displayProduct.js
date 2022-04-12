import { generateProductPage } from "./generateProductPage.js";

function displayProduct(product) {
  const displayContainer = document.getElementById("product-wrapper");
  displayContainer.textContent = "";
  displayContainer.appendChild(generateProductPage(product));
}

export { displayProduct };
