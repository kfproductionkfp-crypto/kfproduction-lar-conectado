const productCards = document.querySelectorAll('#produtos .card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.indicators');
let currentProductIndex = 0;

function showProduct(index) {
  productCards.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
  const indicators = indicatorsContainer.querySelectorAll('span');
  indicators.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentProductIndex = (currentProductIndex - 1 + productCards.length) % productCards.length;
    showProduct(currentProductIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentProductIndex = (currentProductIndex + 1) % productCards.length;
    showProduct(currentProductIndex);
  });
}

showProduct(currentProductIndex);