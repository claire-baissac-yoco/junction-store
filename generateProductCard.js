import { addToCart } from "./shoppingCart.js";
import { calculateDiscount } from "./utils.js";

/**
 * Generates a product card for the given product
 * @param {*} product - the product about which to generate the card
 * @returns - a div element for the product
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

  const productCard = document.createElement("div");
  productCard.className = "product-card";
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  const im = document.createElement("img");

  im.src = image;
  im.alt = productName;
  imageContainer.appendChild(im);
  const imageProductLink = document.createElement("a");
  imageProductLink.href = `product.html?id=${productId}`;
  imageProductLink.appendChild(imageContainer);
  productCard.appendChild(imageProductLink);

  const infoContainer = document.createElement("div");
  infoContainer.className = "info-container";
  const infoContainerHeading = document.createElement("div");
  infoContainerHeading.className = "info-container-heading";
  infoContainerHeading.textContent = productName;
  const headingProductLink = document.createElement("a");
  headingProductLink.href = `product.html?id=${productId}`;
  headingProductLink.appendChild(infoContainerHeading);
  const infoContainerBody = document.createElement("div");
  infoContainerBody.className = "info-container-body";
  infoContainerBody.textContent = description;
  infoContainer.appendChild(headingProductLink);
  infoContainer.appendChild(infoContainerBody);
  productCard.appendChild(infoContainer);

  const priceContainer = document.createElement("div");
  priceContainer.className = "price-container";
  const originalPrice = document.createElement("div");
  originalPrice.className = "original-price";
  if (price - salePrice > 0) {
    originalPrice.textContent = `R ${price}`;
    const discount = calculateDiscount(price, salePrice);
    const discountOverlay = document.createElement("div");
    discountOverlay.className = "discount-overlay";
    discountOverlay.textContent = discount;
    imageContainer.appendChild(discountOverlay);
  }
  priceContainer.appendChild(originalPrice);

  const priceCartContainer = document.createElement("div");
  priceCartContainer.className = "price-cart-container";
  const saleP = document.createElement("div");
  saleP.className = "sale-price";
  saleP.textContent = `R ${salePrice}`;
  priceCartContainer.appendChild(saleP);

  const addCartIcon = document.createElement("div");
  addCartIcon.className = "add-cart-icon";
  const addCartButton = document.createElement("button");
  addCartButton.addEventListener("click", () => {
    onAddToCart(product);
  });
  const cartImg = document.createElement("img");
  cartImg.src = "assets/images/cart.png";
  cartImg.alt = "cart";
  addCartButton.appendChild(cartImg);
  addCartIcon.appendChild(addCartButton);
  priceCartContainer.appendChild(addCartIcon);

  priceContainer.appendChild(priceCartContainer);
  infoContainer.appendChild(priceContainer);

  const productCardItem = document.createElement("li");
  productCardItem.className = "product-item";
  productCardItem.appendChild(productCard);

  return productCardItem;
}

/**
 * Adds the given product to the user's cart
 * @param {*} product object containing the product information
 */
function onAddToCart(product) {
  console.log(product.id);
  // let cartItems = document.getElementById("cart-items");
  addToCart(product);
  // cartItems.textContent = localStorage.getItem("cart").split(",").length;
  console.log(JSON.parse(localStorage.getItem("cart")));
}

export { generateProductCard };
