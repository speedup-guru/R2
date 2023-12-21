//trusted slider
var swiper = new Swiper(".trustedSwipper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    556: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 2,
    },
  },
});