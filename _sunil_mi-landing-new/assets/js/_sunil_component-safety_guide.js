//safety guide slider
var swiper = new Swiper(".safety_guide", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    556: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});