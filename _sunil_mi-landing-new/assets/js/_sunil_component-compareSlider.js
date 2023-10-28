// Swiper difference table slider
var slider = new Swiper('.compare-slider', {
  loop: true,
  slidesPerView: '1',
  spaceBetween: 0,
  centeredSlides: false,
  loop: false,
  // effect: "fade",
  slideToClickedSlide: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    556: {
      slidesPerView: 1.5,
      spaceBetween: 40,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  }
});