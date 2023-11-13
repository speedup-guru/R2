//bf-bundle slider
var swiper = new Swiper(".bf-bundle_slider", {
  // spaceBetween: 15,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
