(function() {
  'use strict';
  const breakpoint = window.matchMedia( '(max-width:767px)' );

  // keep track of swiper instances to destroy later
  let mySwiper;
  const breakpointChecker = function() {
    if ( breakpoint.matches === true ) {
	  if ( mySwiper !== undefined ) mySwiper.destroy( true, true );
	  return;
      } else if ( breakpoint.matches === false ) {
        return enableSwiper();

      }
  };


  const enableSwiper = function() {

    mySwiper = new Swiper ('.skin_promises_slider', {
      slidesPerView: '3',
      // loop: true,
      spaceBetween: 10,
      //centeredSlides: true,
      // a11y: true,
      // keyboardControl: true,
      grabCursor: true,
      // pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
            nextEl: ".swiper-arrow-next",
            prevEl: ".swiper-arrow-prev",
          }
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
})(); /* IIFE end */