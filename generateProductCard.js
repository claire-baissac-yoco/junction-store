/**
 * Generates a product card for the given product
 * @param {*} product - the product about which to generate the card
 * @returns - a div element for the product
 */
function generateProductCard(product) {
  console.log(product);
  const testElement = document.createElement("div");
  testElement.textContent = "hello world";
  return testElement;
}

export { generateProductCard };
