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

function removeFromCart(product) {}

function getCartTotal() {}

function clearCart() {}

export { addToCart, removeFromCart, getCartTotal, clearCart };
