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

export { doFetch };
