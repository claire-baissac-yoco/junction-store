import { createElement } from "./utils";

let numProductsDisplayed = 3;

addToCart = () => {
  console.log("add to cart called");
  let cartItems = document.getElementById("cart-items");
  cartItems.textContent = parseInt(cartItems.textContent) + 1;
};

formatPrice = (price) => {
  price = price.replace("R ", "").replace(", ", "");
  return parseFloat(price);
};

computeDiscount = () => {
  console.log("compute discount called");
  let originalPriceArr = document.getElementsByClassName("original-price");
  let salePriceArr = document.getElementsByClassName("sale-price");
  originalPriceArr = Array.from(originalPriceArr);
  salePriceArr = Array.from(salePriceArr);
  let discountArr = document.getElementsByClassName("discount-overlay");
  originalPriceArr.forEach((op, index) => {
    const origPrice = formatPrice(op.textContent);
    const salePrice = formatPrice(salePriceArr[index].textContent);
    if (!origPrice) {
      discountArr[index].style.background = "none";
    } else if (origPrice - salePrice > 0) {
      const discount = Math.round(((origPrice - salePrice) / origPrice) * 100);
      discountArr[index].textContent = `${discount}% OFF`;
    }
  });
};

function createProductCard(
  productId,
  productName,
  description,
  image,
  price,
  salePrice
) {
  console.log("createProductCard called");
  let productCard = createElement("div", "product-card");
  let imageContainer = createElement("div", "image-container");
  let im = document.createElement("img");
  let discountOverlay = createElement("div", "discount-overlay");
  im.src = image;
  im.alt = productName;
  imageContainer.appendChild(im);
  imageContainer.appendChild(discountOverlay);
  productCard.appendChild(imageContainer);

  let infoContainer = createElement("div", "info-container");
  let infoContainerHeading = createElement("div", "info-container-heading");
  infoContainerHeading.textContent = productName;
  let infoContainerBody = createElement("div", "info-container-body");
  infoContainerBody.textContent = description;
  infoContainer.appendChild(infoContainerHeading);
  infoContainer.appendChild(infoContainerBody);
  productCard.appendChild(infoContainer);

  let priceContainer = createElement("div", "price-container");
  let originalPrice = createElement("div", "original-price");
  if (price - salePrice > 0) {
    originalPrice.textContent = `R ${price}`;
  }
  priceContainer.appendChild(originalPrice);

  let priceCartContainer = createElement("div", "price-cart-container");
  let saleP = createElement("div", "sale-price");
  saleP.textContent = `R ${salePrice}`;
  priceCartContainer.appendChild(saleP);

  let addCartIcon = createElement("div", "add-cart-icon");
  let addCartButton = document.createElement("button");
  addCartButton.onclick = function () {
    addToCart();
  };
  let cartImg = document.createElement("img");
  cartImg.src = "assets/images/cart.png";
  cartImg.alt = "cart";
  addCartButton.appendChild(cartImg);
  addCartIcon.appendChild(addCartButton);
  priceCartContainer.appendChild(addCartIcon);

  priceContainer.appendChild(priceCartContainer);
  infoContainer.appendChild(priceContainer);

  let productCardItem = createElement("li", "product-item");
  let productLink = document.createElement("a");
  productLink.href = `product.html?${productId}`;
  productLink.appendChild(productCard);
  productCardItem.appendChild(productLink);
  let productList = document.getElementById("product-list");
  productList.appendChild(productCardItem);
}

fetchAllProducts = () => {
  fetch("https://yoco-students-api-server.herokuapp.com/v1/junction/").then(
    (response) =>
      response.json().then((data) => {
        if (numProductsDisplayed > data.length) {
          console.log("disable button");
          document.getElementById("show-more-button").disabled = true;
        }

        for (
          let i = numProductsDisplayed - 3;
          i < numProductsDisplayed && i < data.length;
          i++
        ) {
          let product = data[i];
          createProductCard(
            product.id,
            product.name,
            product.description,
            product.image,
            product.price,
            product.discounted_price
          );
        }
        console.log(document.getElementById("show-more-button"));

        computeDiscount();
      })
  );
};

fetchAllProducts();

displayMoreProducts = () => {
  numProductsDisplayed += 3;
  console.log(numProductsDisplayed);
  fetchAllProducts();
};
