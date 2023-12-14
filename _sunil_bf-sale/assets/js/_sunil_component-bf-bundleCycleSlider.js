//BF Bundle Banner slider
var swiper = new Swiper(".bundleCycleSlider", {
  initialSlide: 3,
  effect: "cards",
  // loop: true,
  grabCursor: true,
  centeredSlides: true,
  // autoplay: {
  //   disableOnInteraction: false,
  //   pauseOnMouseEnter: true,
  //   delay: 4000,
  // },
  cardsEffect: {
    perSlideOffset: 8, // Space between cards in px
    perSlideRotate: 0, // Rotation of cards in degrees
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});