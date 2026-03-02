document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const msg = document.getElementById("newsletter-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) {
      msg.textContent = "Por favor, insira um e-mail válido.";
      msg.style.color = "red";
      return;
    }
    msg.textContent = `Obrigado por se inscrever, ${email}!`;
    msg.style.color = "green";
    emailInput.value = "";
  });
});