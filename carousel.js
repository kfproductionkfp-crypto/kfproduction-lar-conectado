document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("carousel-container");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const finalizarBtn = document.getElementById("finalizar-compra");
  const checkoutMsg = document.getElementById("checkout-msg");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutResult = document.getElementById("checkout-result");

  let items = [];
  let index = 0;
  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    atualizarCarrinho();
  }

  fetch("data/products.json")
    .then(response => response.json())
    .then(data => {
      items = data;
      renderItems();
    });

  function renderItems() {
    container.innerHTML = "";
    items.forEach((product, i) => {
      const div = document.createElement("div");
      div.classList.add("carousel-item");
      div.innerHTML = `
        <h3>${product.nome}</h3>
        <p>${product.descricao}</p>
        <p><strong>Preço:</strong> R$ ${product.preco.toFixed(2)}</p>
        <button class="add-cart" data-index="${i}">Adicionar ao Carrinho</button>
      `;
      container.appendChild(div);
    });
    showItem(index);

    document.querySelectorAll(".add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.getAttribute("data-index");
        adicionarAoCarrinho(items[i]);
      });
    });
  }

  function showItem(i) {
    container.style.transform = `translateX(-${i * 100}%)`;
  }

  prev.addEventListener("click", () => {
    index = (index > 0) ? index - 1 : items.length - 1;
    showItem(index);
  });

  next.addEventListener("click", () => {
    index = (index < items.length - 1) ? index + 1 : 0;
    showItem(index);
  });

  function adicionarAoCarrinho(produto) {
    cart.push(produto);
    salvarCarrinho();
    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    cartItems.innerHTML = "";