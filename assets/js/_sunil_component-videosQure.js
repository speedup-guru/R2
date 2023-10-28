(function ($) {
  // videosQure slider
  var CtrSettingsSwiper = {
    init: function () {
      this.CtrSettingsCarousel();
    },
    CtrSettingsCarousel: function () {
      document.querySelectorAll(".qure__swiper").forEach((e => {
        this.CtrCarousel(e);
      }))
    },
    CtrCarousel: function (e) {
      var t = "true" === e?.dataset.autoplay,
        n = "true" === e.dataset.loop,
        w = e?.dataset.rows ? e?.dataset.row : 1,
        o = e?.dataset.slideshow ? e?.dataset.slideshow : 0,
        i = e?.dataset.desktop ? e?.dataset.desktop : 4,
        s = e?.dataset.tablet ? e?.dataset.tablet : 2,
        r = e?.dataset.mobile ? e?.dataset.mobile : 1,
        a = e?.dataset.autoplaySpeed ? e?.dataset.autoplaySpeed : 3e3,
        c = e?.dataset.speed ? e?.dataset.speed : 400,
        l = e?.dataset.effect ? e?.dataset.effect : "slide",
        d = e?.dataset.sectionId,
        u = e?.dataset.row ? e?.dataset.row : 1,
        p = window.innerWidth,
        m = e?.dataset.spacing ? e?.dataset.spacing : 0;
      m = Number(m), a = Number(a), c = Number(c), p <= 767 ? m >= 15 && (m = 15) : p <= 1199 && m >= 30 && (m = 30), new Swiper("#qure__swiper-" + d, {
        slidesPerView: r,
        slidesPerColumn: w,
        spaceBetween: m,
        autoplay: false,
        delay: a,
        loop: n,
        effect: l,
        speed: c,
        watchSlidesProgress: !0,
        watchSlidesVisibility: !0,
        freeMode: true,
        grid: {
          rows: u,
          fill: "row"
        },
        navigation: {
          nextEl: e.querySelector(".swiper-next"),
          prevEl: e.querySelector(".swiper-prev")
        },
        pagination: {
          clickable: !0,
          el: e.querySelector(".swiper-pagination")
        },
        breakpoints: {
          768: {
            slidesPerView: s
          },
          1450: {
            slidesPerView: i
          }
        }
      })
    }
  };
  CtrSettingsSwiper.init();
})(jQuery);
