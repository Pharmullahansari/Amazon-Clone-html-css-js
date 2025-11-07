// ===== Banner Auto Slide =====
let slides = document.querySelectorAll(".banner img");
let slideIndex = 0;
function nextSlide() {
  if (!slides.length) return;
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}
setInterval(nextSlide, 4000);

// ===== Auth Toggle =====
function toggleAuth() {
  document.getElementById("loginBox").classList.toggle("hidden");
  document.getElementById("registerBox").classList.toggle("hidden");
}
function login() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  if (email && pass) {
    alert(`Welcome back, ${email}!`);
    location.href = "index.html";
  } else alert("Please enter valid credentials");
}
function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  if (name && email && pass) {
    alert(`Account created successfully for ${name}`);
    toggleAuth();
  } else alert("Please fill all fields");
}

// ===== Cart System =====
function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}
function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  badge.textContent = cart.length;
}
function loadCart() {
  const container = document.getElementById("cart-container");
  const totalBox = document.getElementById("cart-total");
  if (!container) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.textContent = "";
    return;
  }
  let total = 0;
  container.innerHTML = cart.map((item, i) => {
    total += item.price;
    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <button onclick="removeItem(${i})">Remove</button>
        </div>
      </div>
    `;
  }).join("");
  totalBox.innerHTML = `<h3>Total: ₹${total}</h3>
    <button onclick="checkout()">Proceed to Checkout</button>`;
}
function removeItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}
function checkout() {
  alert("Thank you for shopping with us!");
  localStorage.removeItem("cart");
  loadCart();
  updateCartCount();
}
window.onload = () => {
  updateCartCount();
  loadCart();
};
