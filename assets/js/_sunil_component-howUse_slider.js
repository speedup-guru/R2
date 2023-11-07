
//how to use
var swiper = new Swiper(".howUSe_slider", {
  slidesPerView: "1",
  autoplay: false,
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
      spaceBetween: 66,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 66,
    },
  },
});
