function generateCartItem(product) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.textContent = product;
  return cartItem;
}

function displayCartItems() {
  let cart = localStorage.getItem("cart");
  const cartContainer = document.getElementById("cart-container");
  if (cart) {
    cart = cart.split(",");
    console.log(cart);

    if (cart.length === 0) {
      const emptyCart = document.createElement("div");
      emptyCart.textContent = "Your cart is empty";
      cartContainer.appendChild(emptyCart);
    } else {
      cart.forEach((product) => {
        cartContainer.appendChild(generateCartItem(product));
      });
    }
  } else {
    const emptyCart = document.createElement("div");
    emptyCart.textContent = "Your cart is empty";
    cartContainer.appendChild(emptyCart);
  }
}

displayCartItems();
