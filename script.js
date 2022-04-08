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

function createProductCard(productName, description, image, price, salePrice) {
  console.log("createProductCard called");
  let productCard = document.createElement("div");
  productCard.className = "product-card";
  let imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  let im = document.createElement("img");
  let discountOverlay = document.createElement("div");
  discountOverlay.className = "discount-overlay";
  im.src = image;
  im.alt = productName;
  imageContainer.appendChild(im);
  imageContainer.appendChild(discountOverlay);
  productCard.appendChild(imageContainer);

  let infoContainer = document.createElement("div");
  infoContainer.className = "info-container";
  let infoContainerHeading = document.createElement("div");
  infoContainerHeading.className = "info-container-heading";
  infoContainerHeading.textContent = productName;
  let infoContainerBody = document.createElement("div");
  infoContainerBody.className = "info-container-body";
  infoContainerBody.textContent = description;
  infoContainer.appendChild(infoContainerHeading);
  infoContainer.appendChild(infoContainerBody);
  productCard.appendChild(infoContainer);

  let priceContainer = document.createElement("div");
  priceContainer.className = "price-container";
  let originalPrice = document.createElement("div");
  originalPrice.className = "original-price";
  if (price - salePrice > 0) {
    originalPrice.textContent = price;
  }
  priceContainer.appendChild(originalPrice);

  let priceCartContainer = document.createElement("div");
  priceCartContainer.className = "price-cart-container";
  let saleP = document.createElement("div");
  saleP.className = "sale-price";
  saleP.textContent = salePrice;
  priceCartContainer.appendChild(saleP);

  let addCartIcon = document.createElement("div");
  addCartIcon.className = "add-cart-icon";
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

  let productCardItem = document.createElement("li");
  productCardItem.className = "product-item";
  productCardItem.appendChild(productCard);
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
