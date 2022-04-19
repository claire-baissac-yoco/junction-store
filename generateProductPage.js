import { addToCart, getNumberItemsInCart } from "./shoppingCart.js";
import { createElement } from "./utils.js";

function generateProductPage(product) {
  const {
    name: productName,
    company,
    description,
    price,
    image,
    discounted_price: salePrice,
  } = product;

  document.getElementById("title").textContent = productName;
  let productImageContainer = createElement("div", "product-image-container");
  let productImage = document.createElement("img");
  productImage.src = image;
  productImage.alt = productName;
  productImageContainer.appendChild(productImage);

  let productInfoContainer = createElement("div", "product-info-container");
  let productInfoContainerHeading = createElement(
    "h2",
    "product-info-container-heading"
  );
  productInfoContainerHeading.textContent = productName;
  productInfoContainer.appendChild(productInfoContainerHeading);
  let companyInfo = createElement("span", "company-info");
  companyInfo.textContent = "By ";
  let companyName = createElement("span", "company-name");
  companyName.textContent = company;
  companyInfo.appendChild(companyName);
  productInfoContainer.appendChild(companyInfo);

  let productInfoContainerBody = createElement(
    "div",
    "product-info-container-body"
  );
  productInfoContainerBody.textContent = description;
  productInfoContainer.appendChild(productInfoContainerBody);

  let originalPrice = createElement("div", "original-price");
  if (price - salePrice > 0) {
    originalPrice.textContent = `R ${price}`;
  }
  productInfoContainer.appendChild(originalPrice);

  let salePr = createElement("div", "sale-price");
  salePr.textContent = `R ${salePrice}`;
  productInfoContainer.appendChild(salePr);

  let addCartButtonContainer = createElement(
    "div",
    "add-cart-button-container"
  );
  let addCartButton = createElement("button", "add-cart-button");
  addCartButton.onclick = function () {
    onAddToCart(product);
  };
  addCartButton.textContent = "ADD TO CART";
  addCartButtonContainer.appendChild(addCartButton);
  productInfoContainer.appendChild(addCartButtonContainer);

  let productWrapper = createElement("div", "product-wrapper");
  productWrapper.appendChild(productImageContainer);
  productWrapper.appendChild(productInfoContainer);

  return productWrapper;
}

/**
 * Adds the given product to the user's cart
 * @param {*} product object containing the product information
 */
function onAddToCart(product) {
  addToCart(product);
  document.getElementById("cart-items").textContent = getNumberItemsInCart();
}

export { generateProductPage };
