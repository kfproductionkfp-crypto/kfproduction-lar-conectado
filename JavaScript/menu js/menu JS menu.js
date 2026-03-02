const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav ul');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}