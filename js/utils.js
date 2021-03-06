/**
 * Fetches data from the provided url
 * @param {string} url - the url to fetch data from
 * @returns - json data fetched from given url
 */
async function doFetch(url) {
  try {
    const data = await fetch(url);
    const json = await data.json();
    return json;
  } catch (error) {
    console.log("Error", error);
  }
}

/**
 * Calculates the discount for a product given the original and sale prices
 * @param {string} originalPrice the original price of the product
 * @param {string} salePrice the sale price of the product
 * @returns the discount to display
 */
function calculateDiscount(originalPrice, salePrice) {
  const discount = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100
  );
  return `${discount}% OFF`;
}

/**
 * Calculates the VAT for the given total
 * @param {number} total the value for which to calculate the VAT
 * @returns the VAT for the given total
 */
function calculateVat(total) {
  return (Math.round(0.15 * total * 100) / 100).toFixed(2);
}

/**
 * Creates an HTML element of the given type and with
 * the given class name
 * @param {string} elementType the type of HTML element to create
 * @param {string} className the class name to give the element
 * @returns the HTML element
 */
function createElement(elementType, className) {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

export { doFetch, calculateDiscount, calculateVat, createElement };
