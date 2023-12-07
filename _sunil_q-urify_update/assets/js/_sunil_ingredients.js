var swiper = new Swiper(".ingredients_slider", {
    slidesPerView: 4.5,
    grid: {
        rows: 1,
        fill: "row",
    },
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        556: {
            slidesPerView: 5.3,
        },
        768: {
            slidesPerView: 3,
            grid: {
                rows: 3,
                fill: "row",
            }
        },

    },
});

$(function () {
    $('.ingredients_item').matchHeight({
        property: 'height',
        target: null,
        remove: false
    });
});