document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const list = document.getElementById("menu-list");

  toggle.addEventListener("click", () => {
    list.style.display = list.style.display === "block" ? "none" : "block";
  });
});