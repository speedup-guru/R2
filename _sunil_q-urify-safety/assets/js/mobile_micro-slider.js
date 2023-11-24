var initPress = false;
var swiperPress;
function swiperPress() {
  if (window.innerWidth <= 767) {
    if (!initPress) {
      initPress = true;
      swiperPress = new Swiper(".mobile_micro-slider", {
        slidesPerView: "1",
        // autoplay: {
        //   delay: 2000,
        //   disableOnInteraction: false,
        // },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  } else if (initPress) {
    swiperPress.destroy();
    initPress = false;
  }
}
swiperPress();
window.addEventListener("resize", swiperPress);


function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}


