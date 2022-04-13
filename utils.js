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

function calculateVat() {}

export { doFetch, calculateDiscount };
