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
  const vitrineGrid = document.getElementById("vitrine-grid");

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
      renderCarousel();
      renderVitrine();
    });

  function renderCarousel() {
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

  function renderVitrine() {
    vitrineGrid.innerHTML = "";
    items.forEach((product, i) => {
      const div = document.createElement("div");
      div.classList.add("produto");
      div.innerHTML = `
        <img src="${product.icone}" alt="${product.nome}" />
        <h3>${product.nome}</h3>
        <p>${product.descricao}</p>
        <p><strong>Preço:</strong> R$ ${product.preco.toFixed(2)}</p>
        <button class="add-cart" data-index="${i}">Adicionar ao Carrinho</button>
      `;
      vitrineGrid.appendChild(div);
    });

    vitrineGrid.querySelectorAll(".add-cart").forEach(btn => {
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
    let total = 0;
    cart.forEach((p, idx) => {
      const li = document.createElement("li");
      li.textContent = `${p.nome} - R$ ${p.preco.toFixed(2)}`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remover";
      removeBtn.classList.add("remove-btn");
      removeBtn.addEventListener("click", () => {
        removerDoCarrinho(idx);
      });
      li.appendChild(removeBtn);
      cartItems.appendChild(li);
      total += p.preco;
    });
    cartTotal.textContent = total.toFixed(2);
  }

  function removerDoCarrinho(index) {
    cart.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
  }

  function salvarCarrinho() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  finalizarBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      checkoutMsg.textContent = "Seu carrinho está vazio.";
      checkoutMsg.style.color = "red";
      return;
    }
    checkoutMsg.textContent = "Preencha o formulário abaixo para finalizar.";
    checkoutMsg.style.color = "blue";
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (