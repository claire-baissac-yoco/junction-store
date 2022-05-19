import { generateProductPage } from "./generateProductPage.js";

/**
 * Displays the given product
 * @param {*} product the product to display
 */
function displayProduct(product) {
  const displayContainer = document.getElementById("product-wrapper");
  displayContainer.textContent = "";
  displayContainer.appendChild(generateProductPage(product));
}

export { displayProduct };
