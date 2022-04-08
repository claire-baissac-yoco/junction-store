let productId = window.location.search.replace("?", "");

addToCart = () => {
  console.log("add to cart called");
  let cartItems = document.getElementById("cart-items");
  cartItems.textContent = parseInt(cartItems.textContent) + 1;
};

getProductInfo = () => {
  fetch(
    `https://yoco-students-api-server.herokuapp.com/v1/junction/product/${productId}`
  ).then((response) => {
    response.json().then((data) => {
      console.log(data);
      createProductPage(
        data.name,
        data.description,
        data.image,
        data.price,
        data.discounted_price,
        data.company
      );
    });
  });
};

function createProductPage(
  productName,
  description,
  image,
  price,
  salePrice,
  company
) {
  console.log("createProductPage");
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
    addToCart();
  };
  addCartButton.textContent = "ADD TO CART";
  addCartButtonContainer.appendChild(addCartButton);
  productInfoContainer.appendChild(addCartButtonContainer);

  let productWrapper = document.getElementById("product-wrapper");
  productWrapper.appendChild(productImageContainer);
  productWrapper.appendChild(productInfoContainer);
}

getProductInfo();
