import { generateProductCard } from "./generateProductCard.js";
import { createElement } from "./utils.js";

/**
 * Displays the product cards
 * @param {*} products - array of json objects describing each product
 */
function displayProducts(products) {
  const displayContainer = document.getElementById("product-wrapper");
  displayContainer.textContent = "";
  const productList = createElement("ul", "product-list");
  displayContainer.appendChild(productList);
  products.forEach((product) => {
    productList.appendChild(generateProductCard(product));
  });
}

export { displayProducts };
