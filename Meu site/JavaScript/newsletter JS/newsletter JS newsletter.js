const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`Obrigado por se inscrever, ${email}!`);
    this.reset();
  });
}