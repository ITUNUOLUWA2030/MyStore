
const products = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: "Product " + (i + 1),
  price: Math.floor(Math.random() * 50) + 10,
  stock: Math.floor(Math.random() * 10) + 1,
  image: "https://via.placeholder.com/150"
}));

let cart = [];

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product " + (p.stock <= 3 ? "low-stock" : "");
    
    div.innerHTML = `
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>$${p.price}</p>
      <p>Stock: ${p.stock}</p>
      <button ${p.stock === 0 ? "disabled" : ""} onclick="addToCart(${p.id})">
        Add
      </button>
    `;

    container.appendChild(div);
  });
}

function renderCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name} x${item.qty}
      <button onclick="removeFromCart(${item.id})">❌</button>
    `;
    cartDiv.appendChild(div);
  });

  document.getElementById("total").textContent = total;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product.stock <= 0) return;

  product.stock--;

  let item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderProducts();
  renderCart();
}

function removeFromCart(id) {
  const item = cart.find(i => i.id === id);
  const product = products.find(p => p.id === id);

  product.stock += item.qty;
  cart = cart.filter(i => i.id !== id);

  renderProducts();
  renderCart();
}

function goToCheckout() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("checkoutPage").style.display = "block";
}

function pay() {
  document.getElementById("checkoutPage").style.display = "none";
  document.getElementById("successPage").style.display = "block";

  const summary = document.getElementById("summary");
  summary.innerHTML = "<h3>Order Summary:</h3>";

  cart.forEach(item => {
    summary.innerHTML += <p>${item.name} x${item.qty}</p>;
  });

  cart = [];
}

renderProducts();
renderCart();