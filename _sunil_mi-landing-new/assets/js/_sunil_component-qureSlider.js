
//micro infusion-lp result slider
var swiper = new Swiper(".qureSlider", {
  spaceBetween: 20,
  slidesPerView: 2,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    556: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
});
