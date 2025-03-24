document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalSpan = document.getElementById('cart-total');

  function getCart() {
    const cartString = localStorage.getItem('shoppingCart');
    return cartString ? JSON.parse(cartString) : [];
  }

  function displayCartItems() {
    const cartItems = getCart();
    let cartTotal = 0;

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalSpan.textContent = '0.00';
      return;
    }

    cartItemsContainer.innerHTML = ''; // Clear existing items
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('li');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image">
        <div class="item-info">
          <div class="item-details">
            <h4 class="item-name">${item.title}</h4>
            <p class="item-price">$${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div class="item-quantity">
          <label for="quantity-${item.id}">Quantity:</label>
          <input type="number" id="quantity-${item.id}" name="quantity-${item.id}" value="1" min="1" class="quantity-input" data-item-id="${item.id}">
        </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      cartTotal += item.price;
    });

    cartTotalSpan.textContent = cartTotal.toFixed(2);

    // Add event listeners for quantity changes (if needed for future quantity updates)
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
      input.addEventListener('change', (event) => {
        const itemId = event.target.dataset.itemId;
        const quantity = parseInt(event.target.value);
        // Update cart logic here if needed for quantity changes
        console.log(`Item ID: ${itemId}, Quantity updated to: ${quantity}`);
      });
    });
  }

  displayCartItems();
});
