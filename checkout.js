import {
  getNumberItemsInCart,
  getCartTotal,
  clearCart,
  removeFromCart,
} from "./shoppingCart.js";
import { calculateVat } from "./utils.js";

document.getElementById("cart-items").textContent = getNumberItemsInCart();

function generateCartItem(product) {
  const { name: productName, discounted_price: salePrice, image } = product;
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";

  const imageContainer = document.createElement("div");
  imageContainer.className = "cart-image-container";
  imageContainer.src = image;

  const img = document.createElement("img");
  img.className = "cart-image";
  img.src = image;
  img.alt = productName;
  imageContainer.appendChild(img);

  const headingContainer = document.createElement("div");
  headingContainer.className = "cart-heading-container";
  headingContainer.textContent = productName;

  const imageHeadingContainer = document.createElement("div");
  imageHeadingContainer.className = "image-heading-container";
  imageHeadingContainer.appendChild(imageContainer);
  imageHeadingContainer.appendChild(headingContainer);
  cartItem.appendChild(imageHeadingContainer);

  const priceContainer = document.createElement("div");
  priceContainer.className = "cart-price-container";
  priceContainer.textContent = `R${salePrice}`;

  const removeButton = document.createElement("button");
  removeButton.className = "cart-remove-button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    removeFromCart(product);
  });

  const priceRemoveContainer = document.createElement("div");
  priceRemoveContainer.className = "cart-price-remove-container";
  priceRemoveContainer.appendChild(priceContainer);
  priceRemoveContainer.appendChild(removeButton);
  cartItem.appendChild(priceRemoveContainer);

  const cartListItem = document.createElement("li");
  cartListItem.className = "cart-list-item";
  cartListItem.appendChild(cartItem);
  cartListItem.appendChild(document.createElement("hr"));

  return cartListItem;
}

function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartWrapper = document.createElement("div");
  const checkoutContainer = document.getElementById("checkout-container");
  const cartContainer = document.getElementById("checkout-cart-container");
  cartWrapper.className = "cart-wrapper";
  cartContainer.appendChild(cartWrapper);
  checkoutContainer.appendChild(cartContainer);
  const cartItemList = document.createElement("ul");
  const cartInfo = document.createElement("div");
  cartInfo.className = "cart-info";
  cartWrapper.appendChild(cartInfo);
  cartWrapper.appendChild(cartItemList);

  if (cart.length === 0) {
    cartInfo.textContent = "Your cart is empty";
    cartInfo.className += " empty";
  } else {
    const priceInfo = document.createElement("div");
    priceInfo.className = "cart-price-info";

    const subtotalHeading = document.createElement("span");
    subtotalHeading.className = "cart-price-heading";
    subtotalHeading.textContent = "Sub-total:";
    const subtotalContainer = document.createElement("div");
    subtotalContainer.className = "cart-payment-container";
    subtotalContainer.appendChild(subtotalHeading);
    const subtotal = document.createElement("span");
    subtotal.className = "cart-subtotal";
    const subtotalVal = getCartTotal();
    subtotal.textContent = `R ${subtotalVal}`;
    subtotalContainer.appendChild(subtotal);

    const vatHeading = document.createElement("span");
    vatHeading.className = "cart-price-heading";
    vatHeading.textContent = "VAT:";
    const vatContainer = document.createElement("div");
    vatContainer.className = "cart-payment-container";
    vatContainer.appendChild(vatHeading);
    const vat = document.createElement("span");
    vat.className = "cart-subtotal";
    const vatVal = calculateVat(subtotalVal);
    vat.textContent = `R ${vatVal}`;
    vatContainer.appendChild(vat);

    const totalHeading = document.createElement("span");
    totalHeading.className = "cart-price-heading";
    totalHeading.textContent = "Total:";
    const totalContainer = document.createElement("div");
    totalContainer.className = "cart-payment-container total-payment";
    totalContainer.appendChild(totalHeading);
    const total = document.createElement("span");
    total.className = "cart-subtotal";
    total.textContent = `R ${parseFloat(subtotalVal) + parseFloat(vatVal)}`;
    totalContainer.appendChild(total);

    priceInfo.appendChild(subtotalContainer);
    priceInfo.appendChild(vatContainer);
    priceInfo.appendChild(totalContainer);
    cartWrapper.appendChild(priceInfo);

    const numItemsInCart = getNumberItemsInCart();
    cartInfo.textContent = `Your cart has ${numItemsInCart} ${
      numItemsInCart === 1 ? "item" : "items"
    }`;

    const clearButton = document.createElement("button");
    clearButton.className = "clear-cart-button";
    clearButton.textContent = "Clear cart";
    clearButton.addEventListener("click", () => {
      clearCart();
    });
    cartInfo.appendChild(clearButton);

    cart.forEach((product) => {
      console.log(product);
      cartItemList.appendChild(generateCartItem(product));
    });

    const payButton = document.createElement("button");
    const payButtonContainer = document.createElement("div");
    payButtonContainer.className = "pay-button-container";
    payButtonContainer.appendChild(payButton);
    payButton.className = "pay-button";
    payButton.textContent = "PAY";
    checkoutContainer.appendChild(payButtonContainer);
  }
}

displayCartItems();
