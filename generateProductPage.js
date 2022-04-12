import { addToCart } from "./shoppingCart.js";

function generateProductPage(product) {
  const {
    id: productId,
    name: productName,
    company,
    description,
    price,
    image,
    discounted_price: salePrice,
  } = product;

  let productImageContainer = document.createElement("div");
  productImageContainer.className = "product-image-container";
  let productImage = document.createElement("img");
  productImage.src = image;
  productImage.alt = productName;
  productImageContainer.appendChild(productImage);

  let productInfoContainer = document.createElement("div");
  productInfoContainer.className = "product-info-container";
  let productInfoContainerHeading = document.createElement("h2");
  productInfoContainerHeading.className = "product-info-container-heading";
  productInfoContainerHeading.textContent = productName;
  productInfoContainer.appendChild(productInfoContainerHeading);
  let companyInfo = document.createElement("span");
  companyInfo.className = "company-info";
  companyInfo.textContent = "By ";
  let companyName = document.createElement("span");
  companyName.className = "company-name";
  companyName.textContent = company;
  companyInfo.appendChild(companyName);
  productInfoContainer.appendChild(companyInfo);

  let productInfoContainerBody = document.createElement("div");
  productInfoContainerBody.className = "product-info-container-body";
  productInfoContainerBody.textContent = description;
  productInfoContainer.appendChild(productInfoContainerBody);

  let originalPrice = document.createElement("div");
  originalPrice.className = "original-price";
  if (price - salePrice > 0) {
    originalPrice.textContent = `R ${price}`;
  }
  productInfoContainer.appendChild(originalPrice);

  let salePr = document.createElement("div");
  salePr.className = "sale-price";
  salePr.textContent = `R ${salePrice}`;
  productInfoContainer.appendChild(salePr);

  let addCartButtonContainer = document.createElement("div");
  addCartButtonContainer.className = "add-cart-button-container";
  let addCartButton = document.createElement("button");
  addCartButton.className = "add-cart-button";
  addCartButton.onclick = function () {
    onAddToCart(product);
  };
  addCartButton.textContent = "ADD TO CART";
  addCartButtonContainer.appendChild(addCartButton);
  productInfoContainer.appendChild(addCartButtonContainer);

  let productWrapper = document.createElement("div");
  productWrapper.className = "product-wrapper";
  productWrapper.appendChild(productImageContainer);
  productWrapper.appendChild(productInfoContainer);

  return productWrapper;
}

/**
 * Adds the given product to the user's cart
 * @param {*} product object containing the product information
 */
function onAddToCart(product) {
  console.log(product.id);
  let cartItems = document.getElementById("cart-items");
  cartItems.textContent = localStorage.getItem("cart").split(",").length + 1;
  addToCart(product);
  console.log(localStorage.getItem("cart"));
}

export { generateProductPage };
