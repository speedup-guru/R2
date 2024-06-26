//result slider
var swiper = new Swiper(".result_slider111", {
    spaceBetween: 15,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    direction: 'horizontal',
    rtl: true,
    initialSlide: 12,
    navigation: {
        nextEl: ".qureSlider-swiper-next",
        prevEl: ".qureSlider-swiper-prev",
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

var swiper = new Swiper(".see_slider_ar", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: false,
    direction: 'horizontal',
    rtl: true,
    initialSlide: 0,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            var title = $('.step_slider').data('counter-title') || 'STEP';
            return '<span class="' + className + '"><span class="pg_counter counter_title">' + title + '</span><span class="pg_counter counter_dot"></span>' + '<span class="pg_counter  counter_block">0' + (index + 1) + "</span></span>";
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