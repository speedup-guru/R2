//see slider
var swiper = new Swiper(".see_slider3", {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: false,
  /*autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },*/
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"><span class="pg_counter counter_title">STEP</span><span class="pg_counter counter_dot"></span>' + '<span class="pg_counter  counter_block">0' + (index + 1) + "</span></span>";
    },
  },
  breakpoints: {
    556: {
      slidesPerView: 1,

    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});