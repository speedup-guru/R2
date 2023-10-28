(function ($) {

  // Off Canvas JS
  var canvasWrapper = $(".off-canvas-wrapper");
  $(".btn-menu").on('click', function () {
    canvasWrapper.addClass('active');
  });
  $(".close-action > .btn-close, .off-canvas-overlay").on('click', function () {
    canvasWrapper.removeClass('active');
  });

  //Responsive Slicknav JS
  $('.main-menu').slicknav({
    appendTo: '.res-mobile-menu',
    closeOnClick: true,
    removeClasses: true,
    closedSymbol: '<i class="fal fa-angle-down"></i>',
    openedSymbol: '<i class="fal fa-angle-up"></i>'
  });

  // Scroll Top Hide Show
  var varWindow = $(window);
  varWindow.on('scroll', function () {
    if ($(this).scrollTop() > 250) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }

    // Sticky Header
    if ($('.sticky-header').length) {
      var windowpos = $(this).scrollTop();
      if (windowpos >= 80) {
        $('.sticky-header').addClass('sticky');
      } else {
        $('.sticky-header').removeClass('sticky');
      }
    }
  });

  function bxHeight() {
    if ($(".beauty_img").length) {
      var hdrHeight = $(".beauty_img").outerHeight();
      let header_item = $('.bs_grid');
      header_item.css('--height-header', hdrHeight + 5 + 'px');
    }
  }

  bxHeight();
  $(window).resize(function () {
    bxHeight();
  });
  // =======

  function bxHeight() {
    if ($(".beauty_img").length) {
      var hdrHeight = $(".beauty_img").outerHeight();
      let header_item = $('.bs_grid');
      header_item.css('--height-header', hdrHeight + 5 + 'px');
    }
  }
  bxHeight();
  $(window).resize(function () {
    bxHeight();
  });
  setInterval(bxHeight, 1000);


  //Header
  function hdrHeight() {
    var hdrHeight = $(".header-wrapperBlock").outerHeight();
    let header_item = $('body');
    header_item.css('--headerheight', hdrHeight + 'px');
  }
  hdrHeight();

  //Header
  function skinBoxheight() {
    var skinHeight = $(".skin_p_slider .sp_img").outerHeight();
    let skin_item = $('.skin_p_slider .sp_img').closest('.skin_p_slider');
    skin_item.css('--posTop', skinHeight + 'px');
  }
  setInterval(
    function(){
      skinBoxheight();
    }, 1000);



  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".header-wrapperBlock").addClass("header-sticky");
    } else {
      $(".header-wrapperBlock").removeClass("header-sticky");
    }
  });


  // Black friday Tabs
  $(".bf-compare__button").click(function () {
    $(".bf-compare__button").removeClass("color-btn")
    $(this).addClass("color-btn")
    var getItem = $(this).attr("data-for")
    if (getItem == "mask") {
      $(".upsell-second__items-wrapper").removeClass("active")
      $(".upsell-second__items-wrapper.bf-upsell-mask").addClass("active")
    }
    else if (getItem == "micro") {
      bxHeight();
      $(".upsell-second__items-wrapper").removeClass("active");
      $(".upsell-second__items-wrapper.bf-upsell-microinfusion").addClass("active")
    }
  })

  $(".bf-bundles__item-included").click(function () {
    $(this).parent().toggleClass("active")
    $(this).next().slideToggle()
  });


  //element height
  var maxHeight = 0;
  $(".bs_feature ul li").each(function () {
    if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    $(this).wrapInner("<div class='bsListInner'></div>");
  });
  $(".bs_feature ul li").height(maxHeight);



})(window.jQuery);



// =================================== js for same height ===============================
//uses div's height match
$(function () {
  $('.q_uses_header, .dfrc__hdr, .s_name, .result_item, .trust_item, .serum_bx, .bs_content, .skin_item, .safety_content').matchHeight({
    property: 'height',
    target: null,
    remove: false
  });
});


$(function () {
  setInterval(function () {
    $('.mc_desc').matchHeight({
      property: 'height',
      target: null,
      remove: false
    });

  }, 1000);
});
// =================================== js for accordions ===============================
function toggleContent(expandable) {
  var hiddenDiv = expandable.querySelector('.u_item__hidden-div');
  var accordionIcon = expandable.querySelector('.u_item__accordion');

  // Toggle the visibility of the hiddenDiv
  if (hiddenDiv.style.display === 'none' || hiddenDiv.style.display === '') {
    hiddenDiv.style.display = 'block';
    accordionIcon.innerHTML = '<img src="assets/images/common/minus.png" alt="">';

    // Close other open u_item_expandables
    var allExpandables = document.querySelectorAll('.u_item_expandable');
    for (var i = 0; i < allExpandables.length; i++) {
      var otherExpandable = allExpandables[i];
      if (otherExpandable !== expandable) {
        var otherHiddenDiv = otherExpandable.querySelector('.u_item__hidden-div');
        var otherAccordionIcon = otherExpandable.querySelector('.u_item__accordion');
        otherHiddenDiv.style.display = 'none';
        otherAccordionIcon.innerHTML = '<img src="assets/images/common/plus.png" alt="">';
      }
    }
  } else {
    hiddenDiv.style.display = 'none';
    accordionIcon.innerHTML = '<img src="assets/images/common/plus.png" alt="">';
  }
}


// =============== show more / show less ======================
const risk = document.querySelectorAll(".risk_expandable");
risk.forEach((story) => {
  const button = story.querySelector(".risk__accordion");
  button.addEventListener("click", () => {
    const paragraph = story.querySelector(".risk__hidden-div");
    paragraph.classList.toggle("hidden");
    const text = paragraph.classList.contains("hidden")
      ? "Read More..."
      : "Read Less...";
    button.textContent = text;
  });
});


//choose serum accordion
$('.cs_item__accordion').click(function () {
  $(this).toggleClass('active');
  $(this).next().slideToggle();
})


// faq show more accordion
const faq = document.querySelectorAll(".faq_expandable");
faq.forEach((story) => {
  const button = story.querySelector(".faq__accordion");
  button.addEventListener("click", () => {
    const paragraph = story.querySelector(".faq__hidden-div");
    paragraph.classList.toggle("hidden");
    const text = paragraph.classList.contains("hidden")
      ? "Show More Questions"
      : "Hide More Questions";
    button.textContent = text;
  });
});



// Get all accordion headers	
const accordionHeaders = document.querySelectorAll('.q_uses_header');
// Add click event listeners to each header	
accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');

    // Toggle the 'active' class to expand/collapse the content	
    const content = header.parentNode.nextElementSibling;
    content.classList.toggle('active');
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";

    }
  });
});

// scroll to id
$('a[href*="#"]:not([href="#"])').not('.faq-menu__url').click(function () {
  var target = $(this.hash);
  $('html,body').stop().animate({
    scrollTop: target.offset().top - 100
  }, 'linear');
});
if (location.hash) {
  var id = $(location.hash);
}
$(window).on('load', function () {
  if (location.hash) {
    $('html,body').animate({ scrollTop: id.offset().top - 100 }, 'linear')
  };
});

if ($(".plan_bundle_hdr")[0]) {
  $('.plan_bundle_detail .plan_bundle_hdr').click(function () {
    $(this).next().slideToggle();
  })
}

// =================================== js for slider ===============================
var swiper = new Swiper(".main_b_slider", {
  slidesPerView: 1.3,
  grid: {
    rows: 1,
    fill: "row",
  },
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    556: {
      slidesPerView: 1.3,
    },
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: "row",
      }
    },

  },
});


//press slider
var initPress = false;
var swiperPress;
function swiperPress() {
  if (window.innerWidth <= 767) {
    if (!initPress) {
      initPress = true;
      swiperPress = new Swiper(".press_slider", {
        slidesPerView: "3",
        // autoplay: {
        //   delay: 2000,
        //   disableOnInteraction: false,
        // },
      });
    }
  } else if (initPress) {
    swiperPress.destroy();
    initPress = false;
  }
}
swiperPress();
window.addEventListener("resize", swiperPress);


//press slider
var initPress2 = false;
var swiperPress2;
function swiperPress2() {
  if (window.innerWidth <= 767) {
    if (!initPress2) {
      initPress2 = true;
      swiperPress2 = new Swiper(".press_slider_4", {
        slidesPerView: "4",
        spaceBetween: 10,
      });
    }
  } else if (initPress2) {
    swiperPress.destroy();
    initPress2 = false;
  }
}
swiperPress2();
window.addEventListener("resize", swiperPress2);


//result slider
var swiper = new Swiper(".result_slider", {
  spaceBetween: 15,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-arrowResult-next",
    prevEl: ".swiper-arrowResult-prev",
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


//micro infusion-lp result slider
var swiper = new Swiper(".result_slides_2", {
  spaceBetween: 62,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    556: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

//testimonial result slider
var swiper = new Swiper(".result_slider_2", {
  spaceBetween: 15,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".result_slider_3", {
  spaceBetween: 15,
  // centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.6,
    },
  },
});



// =================
//YOUTUBE VIDEO
$(document).ready(function () {

  $('.play_btn').on('click', function () {
    $('.video-popup').fadeIn('slow');
    return false;
  });

  $('.popup-bg').on('click', function () {
    $('.video-popup').slideUp('slow');
    return false;
  });

  $('.close-btn').on('click', function () {
    $('.video-popup').fadeOut('slow');
    return false;
  });
});


// Video Popup
$(document).ready(function () {
  $('.popup-youtube').magnificPopup({
    type: 'iframe'
  });
});
$('.banner-popup-link').magnificPopup({
  type: 'image'
});




// navbar
$('.hamburger-container').click(function () {
  $('body').toggleClass("openmenu");
});

$(".expand-content").click(function () {
  $(".content-show").slideToggle("slow");
  $(this).toggleClass("minusClass");
});

$(window).resize(function () {
  if (window.innerWidth > 1199) {
    $("#menu").removeAttr("style");
  }
});

var topBar = $(".hamburger li:nth-child(1)"),
  middleBar = $(".hamburger li:nth-child(2)"),
  bottomBar = $(".hamburger li:nth-child(3)");

$(".hamburger-container").on("click", function () {
  if (middleBar.hasClass("rot-45deg")) {
    topBar.removeClass("rot45deg");
    middleBar.removeClass("rot-45deg");
    bottomBar.removeClass("hidden");
  } else {
    bottomBar.addClass("hidden");
    topBar.addClass("rot45deg");
    middleBar.addClass("rot-45deg");
  }
});


// Tab Slider 
$(".tabing-new .tab .tablinks").each(function (e) {
  if (e != 0) $(this).hide();
});

$(".tab_button .next-btn").click(function () {
  var count = $(".tabing-new .tab .tablinks:visible").next().addClass('active');

  if ($(".tabing-new .tab .tablinks:visible").next().length != 0)
    $(".tabing-new .tab .tablinks:visible").next().show().prev().hide().removeClass('active');
  else {
    $(".tabing-new .tab .tablinks:visible").hide();
    $(".tabing-new .tab .tablinks:first").show();
  }
  return false;
});

$(".tab_button .preview-btn").click(function () {
  var count = $(".tabing-new .tab .tablinks:visible").next().addClass('active');

  if ($(".tabing-new .tab .tablinks:visible").prev().length != 0)
    $(".tabing-new .tab .tablinks:visible").prev().show().next().hide();
  else {
    $(".tabing-new .tab .tablinks:visible").hide();
    $(".tabing-new .tab .tablinks:last").show();
  }
  return false;
});


$(".tab_slider .tabcontent").each(function (e) {
  if (e != 0) $(this).hide();
});

$(".tab_button .next-btn").click(function () {
  if ($(".tab_slider .tabcontent:visible").next().length != 0)
    $(".tab_slider .tabcontent:visible").next().show().prev().hide();
  else {
    $(".tab_slider .tabcontent:visible").hide();
    $(".tab_slider .tabcontent:first").show();

  }
  return false;
});

$(".tab_button .preview-btn").click(function () {
  if ($(".tab_slider .tabcontent:visible").prev().length != 0)
    $(".tab_slider .tabcontent:visible").prev().show().next().hide();
  else {
    $(".tab_slider .tabcontent:visible").hide();
    $(".tab_slider .tabcontent:last").show();
  }
  return false;
});

var NumberCount = $('.contents-info .tablinks.active').attr('data-count');
$('.tab_button').attr('page-count', NumberCount);

$('.contents-info .tablinks').on('click', function () {
  var NumberCount = $(this).attr('data-count');
  $('.tab_button').attr('page-count', NumberCount);
});

$('.next-btn').on('click', function () {
  $('video#myVideo4').get(0).pause();
});

$('.preview-btn').on('click', function () {
  $('video#myVideo4').get(0).pause();
});


//Accordion title
$('.accordion__title').click(function () {
  $(this).closest('.serum_accordian').find('.accordion__title').removeClass('accordion__title_active');
  $(this).toggleClass('accordion__title_active');
  $(this).closest('.serum_accordian').find('.accordion__title').next().slideUp();
  $(this).next().slideToggle();
});


// Read more/less
$('.read_button').click(function () {
  $(this).closest('.guide_do').find('.moretext').slideToggle();
  if ($(this).text() == "Read More") {
    $(this).text("Read Less")
  } else {
    $(this).text("Read More")
  }
});


$(".set-innner a").on("click", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this)
      .siblings(".set-innner .content")
      .slideUp(200);
    $(".set-innner a i")
      .removeClass("fa-minus")
      .addClass("fa-plus");
  } else {
    $(".set-innner a i")
      .removeClass("fa-minus")
      .addClass("fa-plus");
    $(this)
      .find("i")
      .removeClass("fa-plus")
      .addClass("fa-minus");
    $(".set-innner a").removeClass("active");
    $(this).addClass("active");
    $(".set-innner .content").slideUp(200);
    $(this)
      .siblings(".set-innner .content")
      .slideDown(200);
  }
});


$(document).ready(function () {
  $('.accordion-button').click(function () {
    var accordionItem = $(this).closest('.mc_item');
    accordionItem.find('.mc_img img').toggleClass('width-increased');
  });
});



// ======= fix banner size
function bannerSize() {
  var refillImg = document.querySelector(".refill_bl .refill_img");
  if (refillImg) {
    var bannerHeight = refillImg.clientHeight;
    let banner_item = document.querySelector('.refill_bl');
    banner_item.style.setProperty('--banner-height', `${bannerHeight + 10}px`);
  }
}
bannerSize();
addEventListener("resize", (event) => {
  bannerSize();
});


// ============== countdown JS ============
// Function to create a countdown timer
function createCountdownTimer(targetDate, targetElement) {
  // Update the countdown every 1 second
  const countdownInterval = setInterval(function () {
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    if (timeRemaining <= 0) {
      // Countdown has ended
      clearInterval(countdownInterval);
      targetElement.querySelector(".theTimer").innerHTML = "Countdown Expired!";
    } else {
      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Update the countdown display for the target element
      targetElement.querySelector(".theTimer").innerHTML =
        `<span data-name="days">${padZeroes(days)}</span> <span class="dots">:</span> <span data-name="hours">${padZeroes(hours)}</span> <span class="dots">:</span> <span data-name="minutes">${padZeroes(minutes)}</span> <span class="dots">:</span> <span data-name="seconds">${padZeroes(seconds)}</span>`;
    }
  }, 1000);
}

// Function to pad zeroes to a number if it's less than 10
function padZeroes(num) {
  return num < 10 ? "0" + num : num;
}

// Set target dates and elements for each countdown section
const countdownSections = document.querySelectorAll(".countdown_timer");

countdownSections.forEach((section) => {
  const targetDate = new Date(section.getAttribute("data-target-date")).getTime();
  const targetElement = section.querySelector(".countdown_block");
  createCountdownTimer(targetDate, targetElement);
});


// === sticky button ===
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('.button_sticky_wrapper').addClass("sticky");
  }
  else {
    $('.button_sticky_wrapper').removeClass("sticky");
  }
});


// ============ qure video js ======
// Get all video player elements
const videoPlayers = document.querySelectorAll('.player');

videoPlayers.forEach(initVideoPlayer);

function initVideoPlayer(player) {
  const myVid = player.querySelector('video.player__video');
  const controlPlay = player.querySelector('.player__button');
  const controlVol = player.querySelector('.player__slider[name="volume"]');
  const controlRate = player.querySelector('.player__slider[name="playbackRate"]');
  const controlSkip = player.querySelectorAll('.player__button[data-skip]');
  const controlFullScreen = player.querySelector('.player__fullscreen');
  const controlProgress = player.querySelector('.progress');
  const progressBar = controlProgress.querySelector('.progress__filled');

  let drag;
  let grap;
  let progression;

  myVid.addEventListener('click', toggleVideo);
  controlPlay.addEventListener('click', toggleVideo);
  controlVol.addEventListener('change', updateVol);
  controlRate.addEventListener('change', updateRate);
  controlFullScreen.addEventListener('click', goFullScreen);
  controlSkip.forEach(control => control.addEventListener('click', forward));
  controlProgress.addEventListener('mouseover', () => { drag = true });
  controlProgress.addEventListener('mouseout', () => { drag = false; grap = false });
  controlProgress.addEventListener('mousedown', () => { grap = drag });
  controlProgress.addEventListener('mouseup', () => { grap = false });
  controlProgress.addEventListener('click', updateCurrentPos);
  controlProgress.addEventListener('mousemove', e => { if (drag && grap) { updateCurrentPos(e) } });

  function toggleVideo() {
    if (myVid.paused) {
      myVid.play();
      controlPlay.innerHTML = "❚ ❚";
      updateProgress();
      progression = window.setInterval(updateProgress, 200);
      myVid.closest(".player").classList.add("video_playing");
    } else {
      myVid.pause();
      controlPlay.innerHTML = "ttt";
      //controlPlay.innerHTML = '<img src="assets/images/common/plus.png" alt="">';
      clearInterval(progression);
      myVid.closest(".player").classList.remove("video_playing");
    }
  }

  function updateVol() {
    const volume = controlVol.value;
    myVid.volume = volume;
  }

  function updateRate() {
    const rate = controlRate.value;
    myVid.playbackRate = rate;
  }

  function goFullScreen() {
    if (myVid.webkitSupportsFullscreen) {
      myVid.webkitEnterFullScreen();
    }
  }

  function forward() {
    const value = Number(this.dataset.skip);
    myVid.currentTime = myVid.currentTime + value;
  }

  function updateProgress() {
    const progress = myVid.currentTime / myVid.duration;
    progressBar.style.flexBasis = `${Math.floor(progress * 1000) / 10}%`;
  }

  function updateCurrentPos(e) {
    const newProgress = (e.clientX - controlProgress.offsetLeft) / controlProgress.clientWidth;
    progressBar.style.flexBasis = `${Math.floor(newProgress * 1000) / 10}%`;
    myVid.currentTime = newProgress * myVid.duration;
  }
}
