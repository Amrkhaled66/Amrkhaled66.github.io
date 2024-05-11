"use strict";

// =============================== add the animation to the header ===============================

const header = document.querySelector("header");
const header__container = document.querySelector(".header__container");
const header__div = document.querySelector(".header__div");
const about__div = document.querySelector(".about__div");
const features__div = document.querySelector(".features__div");
const price__div = document.querySelector(".price__div");
console.log();
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("sticky");
    header__div.style.marginTop = "0px"
  } else {
    header.classList.remove("sticky");
    header__div.style.marginTop = "20px"
  }
});

// =============================== add the animation to the header===============================

// =============================== play and pause the video ===============================
const video = document.querySelector(".video");
// Condition applied to the overlay since user interaction occurs with it, not directly with the video.
const playPauseVideo = function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
video.addEventListener("click", playPauseVideo);

video.playbackRate = 1.1;
// =============================== play and pause the video ===============================

// =============================== show and clode the aside ===============================
//  show aside
const menu_btn = document.querySelector(".header__icon");
const aside = document.querySelector(".aside");
const overlay = document.querySelector(".overlay");
const aside__ul = document.querySelector(".aside__ul");

const showmenu = function () {
  aside.style.width = "55%";
  overlay.classList.remove("hidden");
};
menu_btn.addEventListener("click", showmenu);

//  close aside
const close_aside = document.querySelector(".close_aside");
const closeAside = function (e) {
  aside.style.width = "0";
  overlay.classList.add("hidden");
};
close_aside.addEventListener("click", closeAside);
aside__ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("a_e")) {
    closeAside();
  }
});
// =============================== show and clode the aside ===============================

// =============================== The animation on the video content  ===============================
const video__h2 = document.querySelector(".video__h2 ");
const video__btn = document.querySelector(".video__btn ");
const numericHeight = about__div.getBoundingClientRect().top;
console.log(window.pageYOffset);
setTimeout(function () {
  video__h2.classList.add("video__h2_show");
}, 1000 * 0.5);
setTimeout(function () {
  video__btn.classList.add("video__btn_show");
}, 1000);
video__btn.addEventListener("click", (e) => {
  e.preventDefault();
  about__div.scrollIntoView();
});
// =============================== The animation on the video content  ===============================

const allSections = document.querySelectorAll(".section");

const reavelFunc = function (enteries) {
  const [entery] = enteries;
  if (entery.isIntersecting) {
    entery.target.classList.remove("hidden--section");
  } else {
    entery.target.classList.add("hidden--section");
  }
};

const reavelSections = new IntersectionObserver(reavelFunc, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  section.classList.add("hidden--section");
  reavelSections.observe(section);
});
