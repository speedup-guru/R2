
var swiper = new Swiper(".announcementbar_slider", {
  slidesPerView: 1,
//   direction: "vertical",
  loop: true,
  speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
});


const global = {
    announcementBar: "aws-announcement-bar",
};
function getCookie(e) {
    let t = e + "=",
        n = decodeURIComponent(document.cookie).split(";");
    for (let e = 0; e < n.length; e++) {
        let o = n[e];
        for (;
            " " == o.charAt(0);) o = o.substring(1);
        if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
    }
    return ""
}
var AwsEventShopify = {
init: function() {
    this.setupEventListeners()
},
setupEventListeners: function() {
    const o = document.getElementById(global.announcementBar);
    if (o) {
        const e = o.querySelector(".swiper-announcementBar");
        (e.style.maxHeight = o.offsetHeight + "px", new Swiper(".swiper-announcementBar", {
            loop: !0,
            slidesPerView: 1,
            direction: "vertical",
            autoplay: {
                delay: 3e3
            },
            // navigation: {
            //     nextEl: ".swiper-button-next",
            //     prevEl: ".swiper-button-prev"
            // }
        })), getCookie("announcement_bar") && o.classList.add("d-none"), document.querySelectorAll("#aws-announcement-bar .aws-announcement-close").forEach((e => {
            e.addEventListener("click", (e => {
                e.preventDefault(), e.currentTarget.closest("#aws-announcement-bar").remove(), setCookie("announcement_bar", 1, 1)
            }), !1)
        }))
    }
}
}
AwsEventShopify.init();