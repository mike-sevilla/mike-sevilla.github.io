var root = document.documentElement;
var buttons = document.querySelectorAll("[data-theme-choice");
var toggle = document.querySelector(".nav-toggle");
var nav = document.querySelector("#site-nav");
var year = document.querySelector("#year");

function currentTheme() {
  return root.getAttribute("data-theme") || "system";
}

function paintPressed(theme) {
  buttons.forEach(function (button) {
    var pressed = button.getAttribute("data-theme-choice") === theme;
    button.setAttribute("aria-pressed", String(pressed));
  });
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  paintPressed(theme);
}

paintPressed(currentTheme());

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    applyTheme(button.getAttribute("data-theme-choice"));
  });
});

function closeMenu() {
  if (!nav || !toggle) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

if (toggle && nav) {
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}
