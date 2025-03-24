document.addEventListener('DOMContentLoaded', () => {
    const itemDetailsModal = document.getElementById('item-details-modal');
    const modalItemContent = document.getElementById('modal-item-content');
    const closeButton = document.querySelector('.close-button');
    const viewDetailsButtons = document.querySelectorAll('.view-details-button');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.itemId;
            const itemDetails = getItemDetails(itemId);
            displayItemDetails(itemDetails);
            itemDetailsModal.style.display = "block";
        });
    });

    closeButton.addEventListener('click', () => {
        itemDetailsModal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == itemDetailsModal) {
            itemDetailsModal.style.display = "none";
        }
    });

    function getItemDetails(itemId) {
        const items = {
            1: { image: '../page1/img/478065790_1491934358857123_1619693226157282189_n.jpg', title: 'Skyline Cap', description: 'A sleek and minimalistic cap with a curved brim.', price: 10.00 },
            2: { image: '../page1/img/484469807_9188997974544677_7907898390915953888_n.jpg', title: 'Elegant Urban Oasis Tote', description: 'A stylish tote bag.', price: 5.00 },
            3: { image: '../page1/img/484583772_964669898980272_2655126191281890828_n.jpg', title: 'Casual Coastal Breeze Hat', description: 'A breathable bucket hat.', price: 15.00 },
            4: { image: '../page1/img/9.jpg', title: 'Canvas Vibes Tee', description: 'An artistic graphic tee.', price: 20.00 },
            5: { image: '../page1/img/11.jpg', title: 'Summit Peak Cap', description: 'An adventure-ready cap.', price: 10.00 },
            6: { image: '../page1/img/485222418_1334096377856276_5617491258941503076_n.jpg', title: 'Essential Drift Tee', description: 'A versatile t-shirt.', price: 20.00 },
            7: { image: '../page1/img/485263056_1367500694274282_7486039691021990825_n.jpg', title: 'Velvet Aura Fragrance', description: 'A luxurious perfume.', price: 25.00 },
            8: { image: '../page1/img/Diesel C-seymon Distressed Denim Cap - Blue.jpg', title: 'Trailblaze Diesel Cap', description: 'A bold cap.', price: 15.00 },
            9: { image: '../page1/img/download (5).jpg', title: 'Fusion Spine Tee', description: 'A dynamic graphic tee.', price: 30.00 },
            10: { image: '../page1/img/download (6).jpg', title: 'Asymmetric Flow Sweater', description: 'A modern sweater.', price: 30.00 },
            11: { image: '../page1/img/download (7).jpg', title: 'Offset Vision Hoodie', description: 'A cozy hoodie.', price: 30.00 },
            12: { image: '../page1/img/front facing _Clipart_ jacket design.jpg', title: 'Cosmic Realm Polo', description: 'A long sleeve polo.', price: 45.00 },
            13: { image: '../page1/img/Washed Wide Cargo Denim Pants (2 Color).jpg', title: 'Vintage Terrain Pants', description: 'Baggy, washed cargo pants.', price: 35.00 },
            14: { image: '../page1/img/Slatra Fly Away Nakış Detay Oversize Tshirt Ürün kodu_S1829 599_99₺.jpg', title: 'Graphic Avalon Tee', description: 'A captivating graphic tee.', price: 30.00 },
            15: { image: '../page1/img/Spirited Away Noface hand sewn hoodie.jpg', title: 'Spirited Layers Jacket', description: 'A statement jacket.', price: 40.00 },
            16: { image: '../page1/img/485454623_3358005937666444_8115589700194551673_n.jpg', title: 'Origin Pulse Tee', description: 'A signature Snap Mart tee.', price: 15.00 },
            17: { image: '../page1/img/1.jpg', title: 'Core Essence Tee', description: 'A minimalist tee.', price: 30.00 },
            18: { image: '../page1/img/2.jpg', title: 'SNAP Tee', description: 'A sleek graphic tee.', price: 15.00 },
            19: { image: '../page1/img/Slatra SİGHT Patch ve Nakış Baskılı Oversize Tshirt Ürün kodu_ S1794 599_99₺.jpg', title: 'Visionary Rearview Tee', description: 'A bold graphic tee.', price: 35.00 },
            20: { image: '../page1/img/10.jpg', title: 'SR Monogram Sweater', description: 'A refined sweater.', price: 20.00 },
            21: { image: '../page1/img/8.jpg', title: 'Turtle Skate Tee', description: 'A playful t-shirt.', price: 20.00 },
            22: { image: '../page1/img/5.jpg', title: 'Predator Shadow Tee', description: 'A tiger graphic tee.', price: 20.00 },
            23: { image: '../page1/img/6.jpg', title: 'Porto Heritage Tee', description: 'A Porto Alegre inspired tee.', price: 20.00 },
            24: { image: '../page1/img/7.jpg', title: 'Toxic Tides Tee', description: 'A bold TOXICTANIC tee.', price: 20.00 }
        };
        return items[itemId] || { title: 'Item not found', description: 'Details not available.', price: 0 };
    }

    function displayItemDetails(item) {
        modalItemContent.innerHTML = `
          <img src="${item.image}" alt="${item.title}" style="width: 200px; margin-bottom: 1rem;">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <p class="card-price">$${item.price.toFixed(2)}</p>
          <button class="add-to-cart-button" data-item-id="${item.id}">Add to Cart</button>
        `;
        
        const addToCartButton = modalItemContent.querySelector('.add-to-cart-button');
        addToCartButton.addEventListener('click', () => {
            addToCart(item);
        });
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('shoppingCart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function addToCart(item) {
        let cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert(`${item.title} added to cart!`);
    }
});
