//insta slider
var initInstJoin = false;
var swiperInstJoin;
function swiperCardA() {
  if (window.innerWidth <= 767) {
    if (!initInstJoin) {
      initInstJoin = true;
      swiperInstJoin = new Swiper(".insta_join_slider", {
        slidesPerView: "1.5",
        spaceBetween: 10,
        centeredSlides: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  } else if (initInstJoin) {
    swiperInstJoin.destroy();
    initInstJoin = false;
  }
}
swiperCardA();
window.addEventListener("resize", swiperCardA);