import { generateProductCard } from "./generateProductCard.js";

/**
 * Displays the product cards
 * @param {*} products - array of json objects describing each product
 */
function displayProducts(products) {
  const displayContainer = document.getElementById("product-wrapper");
  console.log(displayContainer);
  displayContainer.textContent = "";
  products.forEach((product) => {
    displayContainer.appendChild(generateProductCard(product));
  });
}

export { displayProducts };
