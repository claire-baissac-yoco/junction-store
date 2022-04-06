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
