const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});
