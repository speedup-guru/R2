var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    cardsEffect: {
        perSlideOffset: 2.5,
        perSlideRotate: 5,
    },
});

function goToSlide(slideIndex) {
    swiper.slideTo(slideIndex, 1000, false);
}
const variantList = document.querySelectorAll(".gift_variant");
function handleClick() {
    variantList.forEach(item => {
        item.classList.remove('gift_variant_active');
    });
    this.classList.add('gift_variant_active');
}

variantList.forEach(function (slide) {
    slide.addEventListener('click', handleClick);
    slide.addEventListener('click', function () {
        const dataValue = this.getAttribute('data-slideTo');
        const dataPrice = this.getAttribute('data-price');
        const resultPrice = dataPrice / 4;
        const resultPriceDiv = document.querySelector('.resultPrice');
        resultPriceDiv.innerHTML = resultPrice;
        console.log(dataValue);
        goToSlide(dataValue);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const variantActive = document.querySelector(".gift_variant_active");
    const dataValue = variantActive.getAttribute('data-slideTo');
    const dataPrice = variantActive.getAttribute('data-price');
    const resultPrice = dataPrice / 4;
    const resultPriceDiv = document.querySelector('.resultPrice');
    resultPriceDiv.innerHTML = resultPrice;
    console.log(dataValue);
    goToSlide(dataValue);
});