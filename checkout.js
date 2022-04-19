import {
  getNumberItemsInCart,
  getCartTotal,
  clearCart,
  removeFromCart,
} from "./shoppingCart.js";
import { calculateVat, createElement } from "./utils.js";

document.getElementById("cart-items").textContent = getNumberItemsInCart();

/**
 * Generates an li HTML element for the given product
 * @param {*} product the product for which to create the HTML element
 * @returns the li element for the product
 */
function generateCartItem(product) {
  const { name: productName, discounted_price: salePrice, image } = product;
  const cartItem = createElement("div", "cart-item");

  const imageContainer = createElement("div", "cart-image-container");
  imageContainer.src = image;

  const img = createElement("img", "cart-image");
  img.src = image;
  img.alt = productName;
  imageContainer.appendChild(img);

  const headingContainer = createElement("div", "cart-heading-container");
  headingContainer.textContent = productName;

  const imageHeadingContainer = createElement("div", "image-heading-container");
  imageHeadingContainer.appendChild(imageContainer);
  imageHeadingContainer.appendChild(headingContainer);
  cartItem.appendChild(imageHeadingContainer);

  const priceContainer = createElement("div", "cart-price-container");
  priceContainer.textContent = `R${salePrice}`;

  const removeButton = createElement("button", "cart-remove-button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    removeFromCart(product);
    location.href = "/checkout.html";
  });

  const priceRemoveContainer = createElement(
    "div",
    "cart-price-remove-container"
  );
  priceRemoveContainer.appendChild(priceContainer);
  priceRemoveContainer.appendChild(removeButton);
  cartItem.appendChild(priceRemoveContainer);

  const cartListItem = createElement("li", "cart-list-item");
  cartListItem.appendChild(cartItem);
  cartListItem.appendChild(document.createElement("hr"));

  return cartListItem;
}

/**
 * Displays the items in the user's cart
 */
function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartWrapper = createElement("div", "cart-wrapper");
  const checkoutContainer = document.getElementById("checkout-container");
  const cartContainer = document.getElementById("checkout-cart-container");
  cartContainer.appendChild(cartWrapper);
  checkoutContainer.appendChild(cartContainer);
  const cartItemList = document.createElement("ul");
  const cartInfo = createElement("div", "cart-info");
  cartWrapper.appendChild(cartInfo);
  cartWrapper.appendChild(cartItemList);

  if (cart.length === 0) {
    cartInfo.textContent = "Your cart is empty";
    cartInfo.className += " empty";
  } else {
    const priceInfo = createElement("div", "cart-price-info");
    const subtotalHeading = createElement("span", "cart-price-heading");
    subtotalHeading.textContent = "Sub-total:";
    const subtotalContainer = createElement("div", "cart-payment-container");
    subtotalContainer.appendChild(subtotalHeading);
    const subtotal = createElement("span", "cart-subtotal");
    const subtotalVal = getCartTotal();
    subtotal.textContent = `R ${subtotalVal}`;
    subtotalContainer.appendChild(subtotal);

    const vatHeading = createElement("span", "cart-price-heading");
    vatHeading.textContent = "VAT:";
    const vatContainer = createElement("div", "cart-payment-container");
    vatContainer.appendChild(vatHeading);
    const vat = createElement("span", "cart-subtotal");
    const vatVal = calculateVat(subtotalVal);
    vat.textContent = `R ${vatVal}`;
    vatContainer.appendChild(vat);

    const totalHeading = createElement("span", "cart-price-heading");
    totalHeading.textContent = "Total:";
    const totalContainer = createElement(
      "div",
      "cart-payment-container total-payment"
    );
    totalContainer.appendChild(totalHeading);
    const total = createElement("span", "cart-subtotal");
    total.textContent = `R ${Math.round(
      ((parseFloat(subtotalVal) + parseFloat(vatVal)) * 100) / 100
    ).toFixed(2)}`;
    totalContainer.appendChild(total);

    priceInfo.appendChild(subtotalContainer);
    priceInfo.appendChild(vatContainer);
    priceInfo.appendChild(totalContainer);
    cartWrapper.appendChild(priceInfo);

    const numItemsInCart = getNumberItemsInCart();
    cartInfo.textContent = `Your cart has ${numItemsInCart} ${
      numItemsInCart === 1 ? "item" : "items"
    }`;

    const clearButton = createElement("button", "clear-cart-button");
    clearButton.textContent = "Clear cart";
    clearButton.addEventListener("click", () => {
      clearCart();
      location.href = "/checkout.html";
    });
    cartInfo.appendChild(clearButton);

    cart.forEach((product) => {
      cartItemList.appendChild(generateCartItem(product));
    });

    const payButton = createElement("button", "pay-button");
    const payButtonContainer = createElement("div", "pay-button-container");
    payButtonContainer.appendChild(payButton);
    payButton.textContent = "PAY";
    checkoutContainer.appendChild(payButtonContainer);
  }
}

displayCartItems();
