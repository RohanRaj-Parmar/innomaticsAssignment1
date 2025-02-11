 // Sample product data with Rupee prices
 const products = [
    { id: 1, name: 'Smartphone', price: 149999, category: 'mobiles', image: 'images/mobile.jpg' },
    { id: 2, name: 'Laptop Pro', price: 89999, category: 'laptops', image: 'images/laptop.jpg' },
    { id: 3, name: 'Wireless Earbuds', price: 9999, category: 'accessories', image: 'images/earbuds.jpg' },
    { id: 4, name: 'Tablet Ultra', price: 34999, category: 'mobiles', image: 'images/tablet.jpg' },
    { id: 5, name: 'Gaming Laptop', price: 124999, category: 'laptops', image: 'images/gaming Laptop.jpg' },
    { id: 6, name: 'Tv', price: 22000, category: 'Tv', image: 'images/tv.jpg' },
    { id: 7, name: 'Smart Watch', price: 24999, category: 'accessories', image: 'images/Smart watch.jpg' },
    { id: 8, name: 'Sofa', price: 12000, category: 'Home decor', image: 'images/sofa.jpg' },
    { id: 9, name: 'Toy', price: 1500, category: 'Kids', image: 'images/TOy.jpg' },
    { id: 10, name: 'Air conditioners', price: 29545, category: 'Electronics', image: 'images/AC.jpg' },
    { id: 11, name: 'Book', price: 554, category: 'Reading', image: 'images/book.jpg' },
    { id: 12, name: 'Shoes', price: 5999, category: 'accessories', image: 'images/shoes.jpg' },

];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format price in Indian Rupees
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

// DOM elements
const productGrid = document.getElementById('productGrid');
const cartIcon = document.getElementById('cartIcon');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const emptyCartBtn = document.getElementById('emptyCart');


// Render products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}


// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Update cart
function updateCart() {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;

    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `<h3>Total: ${formatPrice(total)}</h3>`;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Empty cart
function emptyCart() {
    cart = [];
    updateCart();
}

// Toggle cart panel
cartIcon.addEventListener('click', () => {
    cartPanel.classList.toggle('open');
});

// Empty cart button
emptyCartBtn.addEventListener('click', emptyCart);


// Initial render
renderProducts();
updateCart();