addToCart = () => {
  console.log("add to cart called");
  let cartItems = document.getElementById("cart-items");
  cartItems.textContent = parseInt(cartItems.textContent) + 1;
};

formatPrice = (price) => {
  price = price.replace("R ", "").replace(", ", "");
  console.log(price);
  return parseFloat(price);
};

computeDiscount = () => {
  console.log("compute discount called");
  let originalPriceArr = document.getElementsByClassName("original-price");
  let salePriceArr = document.getElementsByClassName("sale-price");
  originalPriceArr = Array.from(originalPriceArr);
  salePriceArr = Array.from(salePriceArr);
  let discountArr = document.getElementsByClassName("discount-overlay");
  console.log(discountArr);
  originalPriceArr.forEach((op, index) => {
    const origPrice = formatPrice(op.textContent);
    const salePrice = formatPrice(salePriceArr[index].textContent);
    console.log(origPrice, salePrice);
    if (!origPrice) {
      console.log("not on sale");
      discountArr[index].style.background = "none";
    } else if (origPrice - salePrice > 0) {
      const discount = Math.round(((origPrice - salePrice) / origPrice) * 100);
      discountArr[index].textContent = `${discount}% OFF`;
      console.log("discount is ", discount);
    }
  });
};

computeDiscount();

function createProductCard(
  productName,
  description,
  image,
  originalPrice,
  salePrice
) {
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
  let productCardItem = document.createElement("li");
  productCardItem.className = "product-item";
  productCardItem.appendChild(productCard);
  let productList = document.getElementById("product-list");
  console.log(productList);
  productList.appendChild(productCardItem);
}

fetchAllProducts = () => {
  fetch("https://yoco-students-api-server.herokuapp.com/v1/junction/").then(
    (response) => response.json().then((data) => console.log(data))
  );
};

fetchAllProducts();
createProductCard(
  "test",
  "",
  "https://yoco-students-api-server.herokuapp.com/images/junction/product-bottle-1.jpg",
  "R499.99",
  "R399.99"
);
