import { addToCart, getNumberItemsInCart } from "./shoppingCart.js";
import { calculateDiscount, createElement } from "./utils.js";

/**
 * Generates a product card for the given product
 * @param {*} product the product about which to generate the card
 * @returns a div element for the product
 */
function generateProductCard(product) {
  const {
    id: productId,
    name: productName,
    description,
    price,
    image,
    discounted_price: salePrice,
  } = product;

  const productCard = createElement("div", "product-card");
  const imageContainer = createElement("div", "image-container");
  const im = document.createElement("img");
  im.src = image;
  im.alt = productName;
  imageContainer.appendChild(im);
  const imageProductLink = document.createElement("a");
  imageProductLink.href = `product.html?id=${productId}`;
  imageProductLink.appendChild(imageContainer);
  productCard.appendChild(imageProductLink);

  const infoContainer = createElement("div", "info-container");
  const infoContainerHeading = createElement("div", "info-container-heading");
  infoContainerHeading.textContent = productName;
  const headingProductLink = document.createElement("a");
  headingProductLink.href = `product.html?id=${productId}`;
  headingProductLink.appendChild(infoContainerHeading);
  const infoContainerBody = createElement("div", "info-container-body");
  infoContainerBody.textContent = description;
  infoContainer.appendChild(headingProductLink);
  infoContainer.appendChild(infoContainerBody);
  productCard.appendChild(infoContainer);

  const priceContainer = createElement("div", "price-container");
  const originalPrice = createElement("div", "original-price");
  if (price - salePrice > 0) {
    originalPrice.textContent = `R ${price}`;
    const discount = calculateDiscount(price, salePrice);
    const discountOverlay = createElement("div", "discount-overlay");
    discountOverlay.textContent = discount;
    imageContainer.appendChild(discountOverlay);
  }
  priceContainer.appendChild(originalPrice);

  const priceCartContainer = createElement("div", "price-cart-container");
  const saleP = createElement("div", "sale-price");
  saleP.textContent = `R ${salePrice}`;
  priceCartContainer.appendChild(saleP);

  const addCartIcon = createElement("div", "add-cart-icon");
  const addCartButton = document.createElement("button");
  addCartButton.addEventListener("click", () => {
    onAddToCart(product);
  });
  const cartImg = document.createElement("img");
  cartImg.src = "../assets/images/cart.png";
  cartImg.alt = "cart";
  addCartButton.appendChild(cartImg);
  addCartIcon.appendChild(addCartButton);
  priceCartContainer.appendChild(addCartIcon);

  priceContainer.appendChild(priceCartContainer);
  infoContainer.appendChild(priceContainer);

  const productCardItem = createElement("li", "product-item");
  productCardItem.appendChild(productCard);

  return productCardItem;
}

/**
 * Adds the given product to the user's cart
 * @param {*} product object containing the product information
 */
function onAddToCart(product) {
  addToCart(product);
  document.getElementById("cart-items").textContent = getNumberItemsInCart();
}

export { generateProductCard };
