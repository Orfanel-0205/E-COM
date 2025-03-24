document.addEventListener('DOMContentLoaded', () => {
    const checkoutList = document.querySelector('.checkout-list');
    const checkoutTotalSpan = document.getElementById('checkout-total');

    console.log("Checkout script loaded"); // Debugging line
    console.log("Cart in localStorage:", localStorage.getItem("shoppingCart")); // Debugging line

    function getCart() {
        const cartString = localStorage.getItem('shoppingCart');
        return cartString ? JSON.parse(cartString) : [];
    }

    function displayCheckoutItems() {
        const cartItems = getCart();
        console.log("Cart items for checkout:", cartItems); // Debugging line

        let checkoutTotal = 0;
        checkoutList.innerHTML = ''; // Clear previous content

        if (cartItems.length === 0) {
            checkoutList.innerHTML = '<p>No items to checkout.</p>';
            checkoutTotalSpan.textContent = '0.00';
            return;
        }

        cartItems.forEach((item, index) => {
            const checkoutItemElement = document.createElement('li');
            checkoutItemElement.classList.add('checkout-item');
            
            const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
            const quantity = parseInt(item.quantity) || 1; // Ensure quantity is considered
            checkoutTotal += itemPrice * quantity; // Multiply price by quantity

            checkoutItemElement.innerHTML = `
                <div class="checkout-item-details">
                    <img src="${item.image}" alt="${item.title}" class="item-image">
                    <h4 class="item-name">${item.title}</h4>
                    <p class="item-price">$${itemPrice.toFixed(2)}</p>
                    <span class="item-quantity">Quantity: ${quantity}</span>
                    <button class="view-order-button" data-order-id="${index}">View Order Details</button>
                </div>
            `;

            checkoutList.appendChild(checkoutItemElement);
        });

        checkoutTotalSpan.textContent = checkoutTotal.toFixed(2);
    }

    displayCheckoutItems();

    // ✅ Add event delegation for dynamically added buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-order-button')) {
            const orderId = event.target.dataset.orderId;
            alert(`View order details for order ID: ${orderId}`);
        }
    });
});
