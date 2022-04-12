import { generateProductCard } from "./generateProductCard.js";

let numProducts = 3;

/**
 * Displays the product cards
 * @param {*} products - array of json objects describing each product
 */
function displayProducts(products) {
  const displayContainer = document.getElementById("product-wrapper");
  displayContainer.textContent = "";
  const productList = document.createElement("ul");
  productList.className = "product-list";
  displayContainer.appendChild(productList);
  products.forEach((product) => {
    productList.appendChild(generateProductCard(product));
  });
}

export { displayProducts };
