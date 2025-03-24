document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutButton = document.querySelector('.checkout-button');

    console.log("Cart in localStorage:", localStorage.getItem("shoppingCart"));


    function getCart() {
        const cartString = localStorage.getItem('shoppingCart');
        return cartString ? JSON.parse(cartString) : [];
    }

    function saveCart(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
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
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');

            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = item.quantity || 1;
            cartTotal += itemPrice * itemQuantity;

            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="item-image">
                <div class="item-info">
                    <div class="item-details">
                        <h4 class="item-name">${item.title}</h4>
                        <p class="item-price">$${itemPrice.toFixed(2)}</p>
                    </div>
                </div>
                <div class="item-quantity">
                    <label for="quantity-${index}">Quantity:</label>
                    <input type="number" id="quantity-${index}" name="quantity-${index}" value="${itemQuantity}" min="1" class="quantity-input" data-item-id="${index}">
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalSpan.textContent = cartTotal.toFixed(2);

        // Update quantity in localStorage when changed
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const index = event.target.dataset.itemId;
                const quantity = parseInt(event.target.value);
                if (quantity < 1) return;

                let cart = getCart();
                cart[index].quantity = quantity;
                saveCart(cart);
                displayCartItems(); // Refresh cart display
            });
        });
    }

    displayCartItems();

    checkoutButton.addEventListener('click', () => {
        console.log("Checkout button clicked"); // Debugging line
        window.location.href = '../page3/index.html'; // Redirect to checkout page
    });
});
