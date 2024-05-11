const body = document.body;

// =============================== add the animation to the header===============================
const user__btn = document.querySelector(".user__btn");
const header__dropdown = document.querySelector(".header__dropdown");

user__btn.addEventListener("click", (e) => {
  header__dropdown.classList.toggle("hidden");

  // prevent this event to become as a DOM event
  e.stopPropagation();
});

document.addEventListener("click", () => {
  if (!header__dropdown.classList.contains("hidden")) {
    header__dropdown.classList.add("hidden");
  }
});

const inner__prgrassbar = document.querySelector(".inner__prgrassbar");
