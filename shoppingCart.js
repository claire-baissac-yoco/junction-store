function addToCart(product) {
  try {
    let cart = localStorage.getItem("cart").split(",");
    cart.push(product.id);
    localStorage.setItem("cart", cart.toString());
  } catch (error) {
    let cart = [product.id];
    console.log(cart);
    localStorage.setItem("cart", cart.toString());
  }
}

function removeFromCart(product) {
  let cart = localStorage.getItem("cart").split(",");
  const index = cart.indexOf(product.id);
  if (index > -1) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", cart.toString());
}

function getCartTotal() {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return cart.split(",").length;
  } else {
    return 0;
  }
}

function clearCart() {
  localStorage.removeItem("cart");
}

export { addToCart, removeFromCart, getCartTotal, clearCart };
