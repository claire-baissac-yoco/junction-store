function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const index = cart.findIndex((prod) => {
    return prod.id === product.id;
  });
  if (index > -1) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartTotal() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce(
    (total, currentValue) => (total += currentValue.discounted_price),
    0
  );
  return Math.round((total * 100) / 100).toFixed(2);
}

function clearCart() {
  localStorage.removeItem("cart");
}

function getNumberItemsInCart() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.length;
}

export {
  addToCart,
  removeFromCart,
  getCartTotal,
  clearCart,
  getNumberItemsInCart,
};
