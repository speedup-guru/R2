/** Shopify CDN: Minification failed

Line 19:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 26:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 33:1 Transforming let to the configured target environment ("es5") is not supported yet
Line 45:46 Transforming destructuring to the configured target environment ("es5") is not supported yet
Line 77:22 Transforming destructuring to the configured target environment ("es5") is not supported yet
Line 96:1 Transforming const to the configured target environment ("es5") is not supported yet
Line 97:1 Transforming const to the configured target environment ("es5") is not supported yet
Line 98:1 Transforming const to the configured target environment ("es5") is not supported yet
Line 117:21 Transforming default arguments to the configured target environment ("es5") is not supported yet
Line 118:22 Transforming default arguments to the configured target environment ("es5") is not supported yet
... and 102 more hidden warnings

**/
console.log('Running theme.js ABConvert version')
//console.log(page_title, page_handle, template, customer_is_logged_in, page_id, cart_price, cart_item_count);

const AUDIENCE_FILTERING_OPERATOR = {
	CONTAIN: 'contain',
	NOT_CONTAIN: 'not contain',
	EQUAL: 'equal',
	NOT_EQUAL: 'not equal'
};

const AUDIENCE_FILTERING_ACTION = {
	ASSIGN_TEST_GROUP: 'assign-test-group',
	ASSIGN_RANDOM: 'assign-random',
	EXCLUDE: 'exclude'
};

function getHashNumber() {
	let hash_number = localStorage.getItem(`abconvert-seed`);
	if (hash_number == null) {
		hash_number = Math.floor(Math.random() * 100).toString();
		localStorage.setItem(`abconvert-seed`, hash_number);
	}
	return hash_number;
}

function getPreviewCountryCode() {
	return window.sessionStorage.getItem('abconvert-country');
}

function handleAudienceFilter(urlParamsValue, { operator, value, action, groupIndex = 0 }, notMatchAction) {
	//trun into switch case
	switch (operator) {
		case AUDIENCE_FILTERING_OPERATOR.CONTAIN:
			if (urlParamsValue.includes(value)) {
				return handleAction({ action, groupIndex });
			} else {
				return -1;
			}
		case AUDIENCE_FILTERING_OPERATOR.NOT_CONTAIN:
			if (!urlParamsValue.includes(value)) {
				return handleAction({ action, groupIndex });
			} else {
				return -1;
			}
		case AUDIENCE_FILTERING_OPERATOR.EQUAL:
			if (urlParamsValue === value) {
				return handleAction({ action, groupIndex });
			} else {
				return -1;
			}
		case AUDIENCE_FILTERING_OPERATOR.NOT_EQUAL:
			if (urlParamsValue !== value) {
				return handleAction({ action, groupIndex });
			} else {
				return -1;
			}
		default:
			return -1;
	}
}

function handleAction({ action, groupIndex = 0 }) {
	//rewrite the below code to switch case
	switch (action) {
		case AUDIENCE_FILTERING_ACTION.ASSIGN_TEST_GROUP:
			return groupIndex;
		case AUDIENCE_FILTERING_ACTION.ASSIGN_RANDOM:
			return 'random';
		case AUDIENCE_FILTERING_ACTION.EXCLUDE:
			return 0;
		default:
			return 0;
	}
}

function getCountryCode() {
	return localStorage.getItem('abconvert-country');
}

function getPreviewNumber() {
	const url = new URLSearchParams(location.search);
	const previewNumber = url.get('preview');
	const countryCode = url.get('countryCode');
	if (countryCode) {
		window.sessionStorage.setItem('abconvert-country', countryCode);
	}
	if (previewNumber && !isNaN(Number(previewNumber))) {
		window.sessionStorage.setItem('abconvert-preview-number', previewNumber);
		return url.get('preview');
	} else {
		return window.sessionStorage.getItem('abconvert-preview-number');
	}
}

/**
 * Return test groups index
 * @param {*} percentages
 * @returns
 */
function getGroupIndex(
	percentages,
	isFilteredByCountry = false,
	filteredCountriesMap = null,
	isFilteredByAudience = false,
	audienceFilterList = [],
	audienceFilterNotMatchAction = null
) {
	if (isFilteredByCountry) {
		const countryCode = getCountryCode();
		//@ts-ignore
		if (filteredCountriesMap && !filteredCountriesMap[countryCode]) {
			return 0;
		}
	}
	if (isFilteredByAudience && audienceFilterList.length && audienceFilterNotMatchAction) {
		//@type {(number| string)}
		let groupIndex;
		groupIndex = -1;
		for (let i = 0; i < audienceFilterList.length; i++) {
			const audienceFilter = audienceFilterList[i];
			const trafficSource = audienceFilter.trafficSource;
			const urlParamsValue = localStorage.getItem(trafficSource);
			if (urlParamsValue) {
				//check if the url param value match the audience filter and return the group index
				groupIndex = handleAudienceFilter(urlParamsValue, audienceFilter, audienceFilterNotMatchAction);
			}
			if (groupIndex != -1) break;
		}
		if (groupIndex == -1) {
			//no match audience filter, return the not match action
			groupIndex = handleAction(audienceFilterNotMatchAction);
		}
		if (groupIndex != 'random') {
			//if the group index is not random, return the group index
			return groupIndex;
		}
	}
	//start randomly assign group
	const hash_number = getHashNumber();
	let accumulateNumber = 0;
	let groupIndex;
	for (groupIndex = 0; groupIndex < percentages.length; ++groupIndex) {
		accumulateNumber += percentages[groupIndex];
		if (Number(hash_number) < accumulateNumber) {
			return groupIndex;
		}
	}
	return groupIndex;
}

function _getProductIndex(data) {
	let groupIndex;
	const previewNumber = getPreviewNumber();
	if (previewNumber && !isNaN(Number(previewNumber))) {
		if (previewNumber >= data.testPercentages.length) {
			groupIndex = 0;
		} else {
			let showOriginal = false;
			if (data.isFilteredByCountry && data.filteredCountriesMap) {
				const countryCode = getPreviewCountryCode();
				if (countryCode && !data.filteredCountriesMap[countryCode]) {
					showOriginal = true;
				}
			}
			if (showOriginal) {
				groupIndex = 0;
			} else {
				groupIndex = previewNumber;
			}
		}
	} else {
		groupIndex = getGroupIndex(
			data.testPercentages,
			data.isFilteredByCountry,
			data.filteredCountriesMap,
			data.isFilteredByAudience,
			data.audienceFilterList,
			data.audienceFilterNotMatchAction
		);
	}
	return groupIndex;
}



if(is_admin_interface)
{
	$('.hamburger-container').click(function() {
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
}

var _learnq = _learnq || [];

if(customer_is_logged_in)
{
	_learnq.push(['identify', {
		'$email': customer_email,
		'$first_name': customer_first_name,
		'$last_name': customer_last_name, 
	}]);
}

function DraweTimer(){ 
	var interval = 780000;
	function reset()
	{
			localStorage.endTime = +new Date + interval;
	}

	if(!localStorage.endTime)
	{
			reset();
	}

	var id = setInterval(function () {
			var remaining = localStorage.endTime - new Date;
			if( remaining >= 0 )
			{
				
					var second =  Math.floor ((remaining/1000) % 60 );
					var minutes = Math.floor( (remaining/1000/60) % 60 );
					$("#cart-countdown").html("<span>" + minutes + "</span> : <span>" + second + "</span>");
					
			} else
			{
					//reset();
					clearInterval(id);
					localStorage.clear();
					//alert("Time Is Over Bottom");
					$.ajax({
								type: "POST",
								url: '/cart/clear.js',
								data: '',
								dataType: 'json',
								success: function() { 
									$(".my-cart").load(location.href + " .my-cart");
								},
								error: function(XMLHttpRequest, textStatus) {
									/* error code */
								}
							});
			}
	}, 1000);  
}

$("body").on("click", ".insurance__text--top", function() {
	$(".ins-popup__overlay").addClass("active")
	$(".ins-popup").addClass("active")
});

$("body").on("click", ".ins-popup", function(e) {
	$(".ins-popup__overlay").removeClass("active")
	$(".ins-popup").removeClass("active")
});

$(".ins-popup-wrapper").click(function(e) {
	e.stopPropagation();
});

$(".ins-popup__close").click(function() {
	$(".ins-popup__overlay").removeClass("active")
	$(".ins-popup").removeClass("active")
});

$(window).scroll(function(){
	if ($(this).scrollTop() > 500) {
		$('.land-sticky').addClass('sticky');
	} else {
		$('.land-sticky').removeClass('sticky');
	}
});

$(window).scroll(function(){
	if ($(this).scrollTop() > 500) {
		$('.landing-menu').addClass('sticky');
	} else {
		$('.landing-menu').removeClass('sticky');
	}
});

$("a.rev").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-reviews").offset().top
	}, 3000);
});

$("a.result").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-img-with-text").offset().top
	}, 3000);
});

$("a.faq").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-faq").offset().top
	}, 3000);
});

$(window).on("load" , function(){
	spaceTop();
	$(window).on("resize" , function(){
		spaceTop();
	});
});

function spaceTop(){
	var starW = $("#shopify-section-header").height();
	$("body").css("padding-top" , starW);
}

$("body").on("click" , ".menu-mobile__item_dropdown a" , function(){
	$(this).parent().toggleClass("active");
});

var mobtitle = $("#shopify-section-product-result .section-the-result h2").text();

$("#shopify-section-product-result .section-the-result .the-result-left").before('<div class="tmobile-only"><h2>'+ mobtitle +'</h2></div>')

$('.faq-menu__item a[href*="#"]').click(function(e){
	$(".faq-menu__item").removeClass("active");
	$(this).parents("li").addClass("active");
	e.preventDefault()
	console.log("click11")
	var el = $(this),
			target = el.attr('href'),  
			indiTarget = $('[data-id="'+target+'"]');
	$(target).add(indiTarget).addClass('active').siblings().removeClass('active');
});

if(page_title != 'VSL landing page')
{
	$(function() {
		$('a[href*=\\#]:not([href=\\#])').on('click', function() {
			var target = $(this.hash);
			var spacetop = $(".header").height() + 15 ;
			target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - spacetop
				}, 1);
				return false;
			}
		});
	});
}

$("body").on("click" , ".mobile-dropdown" , function(){
	$(".faq-menu").slideToggle();
});

$(".faq-menu__url").click(function(){
	if($(window).width() <= 767){
		var activestr = $(this).text();
		var activeImg = $(".faq-menu__item.active img").attr("src")
		console.log(activestr)
		console.log(activeImg)
		$(".mobile-dropdown__content-img").attr("src",activeImg)
		$(".mobile-dropdown span").text(activestr);
		$(".faq-menu").hide();
	}
});

$(".custom-warranty-link, .custom-warranty-link span").click(function(e){
		e.preventDefault()
		$(".faq-menu__item").removeClass("active");
		$(".faq-menu__item:nth-child(6)").addClass("active");
		var el = $(".faq-menu__item:nth-child(6) a"),
		target = el.attr('href'),  
		indiTarget = $('[data-id="'+target+'"]');
		$(target).add(indiTarget).addClass('active').siblings().removeClass('active');
		$("html, body").animate({
				scrollTop: 0
		}, 200);    
});

$(document).on("click",".open_chat",function(){
	var gorgiasChatInterval = window.setInterval(function() {
		if (window.GorgiasChat && GorgiasChat.hasOwnProperty("on")) {
			window.clearInterval(gorgiasChatInterval); // this line breaks out of the loop - make sure it's not deleted.
			GorgiasChat.open();
		}
	}, 100);
});

$(document).on("click",".cart-drawer__close-1 .icon-x",function(){
	$('.cart-drawer .cart-boost').hide();
});

// aaaaqqqq
// (function(e,a){
// 	var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol;
// 	t=e.createElement("script");t.type="text/javascript";
// 	t.charset="utf-8";t.async=!0;t.defer=!0;
// 	t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t);
// })(document,"125205");

// if(cart_item_count >= 1)
// {
// 	DraweTimer();
// }
// else {
// 	$(document).on('click','button.prd-btn.product-btn, .drawer__cart-quantity a, a.drawer__cart-remove-item, treatment-buy__button',function(){  
// 		setTimeout(function() {
// 					DraweTimer();
// 		}, 1500);
// 	});
// }

$('.cus-annoucment').show();

$(".open-popup-link").magnificPopup({
	type: "inline",
	midClick: true,
	fixedContentPos: false,
	mainClass: "mfp-fade",
	callbacks: {
		open: function() {
			jQuery('html').addClass('noscroll');
		},
		close: function() {
			jQuery('html').removeClass('noscroll');
		}
	}
});

$('.custom-popup').magnificPopup({
	type: 'inline',
	midClick: true,
	mainClass: 'mfp-fade'
});

$('.signin-toggle').click(function(){
	$('.account-drawer__signin').toggle();
	$('.form__register-text').toggle();
	$('.ac__signin').toggle();
	$('.ac__register').toggle();
});

$('.account-drawer__close').click(function(){
	$('.account-drawer').removeClass('ac-drawer-opened');
});

$('.account-drawer__back').click(function(){
	$('.account-drawer').removeClass('ac-drawer-opened');
});

$('.ac_url').click(function(e){
	e.preventDefault();
	$('.account-drawer').addClass('ac-drawer-opened');
});

$(()=>{
	var createSlick = ()=>{
	let slider = $(".nws-section.drd .row");

	slider.not('.slick-initialized').slick({
		autoplay: false,
		infinite: true,
		dots: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		centerMode: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					adaptiveHeight: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots:true,
				},
			},
		],
			});	
			}

			createSlick();

			$(window).on( 'resize orientationchange', createSlick );

});

$('.custom-popup').magnificPopup({
	type: 'iframe'
});

$('.iamge-poput').magnificPopup({
	type: 'image'
});

$('.new-slider').slick({
	dots: true,
	infinite: false,
	speed: 300,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

$(".new-sections .info-slider .slider-content").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	asNavFor: ".slider-thumb",
	arrows: false,
	autoplay: false,
	centerMode: false,
	prevArrow:
	'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
	nextArrow:
	'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>'
});

$(".new-sections .info-slider .slider-thumb").slick({
	slidesToShow: 6,
	slidesToScroll: 1,
	asNavFor: ".slider-content",
	dots: false,
	arrows: false,
	focusOnSelect: true,
	variableWidth: false,
	centerMode: false,
	autoplay: false,
});

var swiper = new Swiper(".magic-slider-info .mySwiper", {
	speed: 500,
	slidesPerView: "auto",
	centeredSlides:false,
	spaceBetween: 30,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	loop: false,
});

var swiper = new Swiper(".daily-use .mySwiper", {

	slidesPerView: "auto",
	spaceBetween: 16,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

$("ul.tabs li").click(function () {
	var tab_id = $(this).attr("data-tab");

	$("ul.tabs li").removeClass("current");
	$(".tab-content").removeClass("current");

	$(this).addClass("current");
	$("#" + tab_id).addClass("current");
});

$('.see-result .result-slider').slick({
	dots: true,
	infinite: false,
	speed: 300,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

$('.new-sections .icon-sldier').slick({
	dots: true,
	arrows: false,
	autoplay:true,
	adaptiveHeight: true,
	infinite: false,
	speed: 300,
	slidesToShow: 4,
	slidesToScroll: 4,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

$('.about-slider-section .about-slider').slick({
	centerMode: true,
	centerPadding: '5px',
	slidesToShow:1,
	autoplay:false,
	infinite: true,
	loop:true,
	speed:500,
});

$('.new-steps').slick({
		dots: false,
		infinite:false,
		speed: 300,
		arrows: true,
		slidesToShow: 4,
		loop:false,
		slidesToScroll: 1,
		nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
});

$('.skin-result-main').slick({
		dots: false,
		infinite:false,
		speed: 300,
		arrows: true,
		slidesToShow: 3,
		loop:false,
		slidesToScroll: 1,
		nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		} 
	]
});

$('.skin-banner .img-left').slick({
	dots: true,
	infinite: false,
	speed: 300,
	arrows: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	centerMode: true,
	centerPadding: '52.5px',
	nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
	prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
});

if(template.includes('product') || page_handle == 'microinfusion')
{
	$(window).scroll(function(){
		if ($(this).scrollTop() > 500) {
			$('li.nav__item.show-on-desktop').addClass('sticky');
			$('.cart-custom').addClass('sticky');
		} else {
			$('li.nav__item.show-on-desktop').removeClass('sticky');
			$('.cart-custom').removeClass('sticky');
		}
	});
}

if(template.includes('product') || page_handle == 'micro-infusion-refill')
{
	$(window).scroll(function(){
		if ($(this).scrollTop() > 500) {
			$('li.nav__item.show-on-desktop').addClass('sticky');
			$('.cart-custom').addClass('sticky');
		} else {
			$('li.nav__item.show-on-desktop').removeClass('sticky');
			$('.cart-custom').removeClass('sticky');
		}
	});
}

var $carousel = $(".bakuchiol-section .slider");

var settings = {
	dots: true,
	arrows: false,
	autoplay:false,
	slide: ".slick-slideshow__slide",
	slidesToShow: 1,
	centerMode: true,
	autoplay: false,
	centerPadding: "270px"

};

function setSlideVisibility() {
	//Find the visible slides i.e. where aria-hidden="false"
	var visibleSlides = $carousel.find(
		'.slick-slideshow__slide[aria-hidden="false"]'
	);
	//Make sure all of the visible slides have an opacity of 1
	$(visibleSlides).each(function () {
		$(this).css("opacity", 1);
	});

	//Set the opacity of the first and last partial slides.
	$(visibleSlides).first().prev().css("opacity", 0);
}

$carousel.slick(settings);
$carousel.slick("slickGoTo", 1);
setSlideVisibility();

$carousel.on("afterChange", function () {
	setSlideVisibility();
});

var swiper = new Swiper(".bakuchiol-section .bakuch-slider", {
	slidesPerView: "auto",
	spaceBetween: 40,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

var swiper = new Swiper(".product-banner .mySwiper", {
	slidesPerView: "auto",
	spaceBetween: 12,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

var swiper = new Swiper(".nut-slid.mobile-view .mySwiper", {
	slidesPerView: "auto",
	spaceBetween: 22,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

var swiper = new Swiper(".review-cus-sldier .mySwiper", {

	slidesPerView: "auto",
	spaceBetween: 10,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	autoplay: {
		delay: 3000
	},
});

$(".dropdown").hover(
	function () {
		$(".dropdown-menu", this).fadeIn(300);
	},
	function () {
		$(".dropdown-menu", this).fadeOut(300);
	}
);

$('.recommand-slider .recom-slider').slick({
	dots: true,
	slidesToShow: 2,
	slidesToScroll: 6,
	swipeToSlide: true,
	swipe: true,
	arrows: true,
	infinite: false,
	responsive: [
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				arrows: false,
				slidesToScroll: 1
			}
		}
	]
});

$('.scrollable').on('afterChange', function (event, slick, currentSlide) {

	if(currentSlide === 2) {
		$('.slick-next').addClass('hidden');
	}
	else {
		$('.slick-next').removeClass('hidden');
	}

	if(currentSlide === 0) {
		$('.slick-prev').addClass('hidden');
	}
	else {
		$('.slick-prev').removeClass('hidden');
	}  
})

$('.trial-slider').slick({
	dots: true,
	infinite: false,
	speed: 300,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

$('.Banner-bottom').slick({
	dots: true,
	infinite: false,
	speed: 300,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

$(".micro-slider .slider-content").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	fade: false,
	infinite: false,
	speed: 1000,
	asNavFor: ".slider-thumb",
	arrows: true,
});

$(".micro-slider .slider-thumb").slick({
	slidesToShow: 3,
	slidesToScroll: 3,
	asNavFor: ".slider-content",
	dots: false,
	centerMode: false,
	focusOnSelect: true
});

$('.bfcm-slider').slick({
	dots: false,
	infinite: true,
	speed: 300,
	slidesToShow: 5,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: true
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true
			}
		}

	]
});

$('.customer-sldier').slick({
	dots: true,
	infinite: true,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 1,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				dots: true
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true
			}
		}

	]
});

$('.bfcm-skincar-main.mobile .bfcm-skincar-slider').slick({
	dots: true,
	infinite: true,
	speed: 500,
	fade: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	cssEase: 'linear'
});

$('.cus-video-sli').slick({
	dots: true,
	infinite: true,
	speed: 300,
	slidesToShow: 3,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				dots: true
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true
			}
		}

	]
});

var swiper = new Swiper(".land-imgText-wrapper.mobile-only .mySwiper", {
	slidesPerView: "auto",
	spaceBetween: 20,
	autoplay: 500,
	speed: 800,
	dots: true,
	pagination: {
		el: ".slider-pagination",
		clickable: true,
	},
});

$("a.rev").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-reviews-acne").offset().top
	}, 3000);
});

$("a.result").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-img-with-text").offset().top
	}, 3000);
});

$("a.faq").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-faq").offset().top
	}, 3000);
});

$(".product__star-rating.acne").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-reviews-acne").offset().top
	}, 3000);
});

$(".product__star-rating").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-reviews").offset().top
	}, 3000);
});

const second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;
var countDown25 = new Date("jan 03, 2022 00:00:00 GMT+11:00").getTime();

x = setInterval(function() {    

	let options = {
		timeZone: 'Australia/Canberra',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	},
	formatter = new Intl.DateTimeFormat([], options);
	let now25 = new Date().getTime(),
	distance25 = countDown25 - now25;


	var days25 = Math.floor(distance25 / (day));
	var hours25 = Math.floor((distance25 % (day)) / (hour));
	var minutes25 = Math.floor((distance25 % (hour)) / (minute));
	var seconds25 = Math.floor((distance25 % (minute)) / second); 

	jQuery('.days-cus').html(days25 < 10 ? "0" + days25 : days25);
	jQuery('.hours-cus').html(hours25 < 10 ? "0" + hours25 : hours25);
	jQuery('.minutes-cus').html(minutes25 < 10 ? "0" + minutes25 : minutes25);
	jQuery('.second-cus').html(seconds25 < 10 ? "0" + seconds25 : seconds25);
}, second);

$('.video-pop').magnificPopup({
	type: 'iframe'
});

$('.intro-img .slider-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.slider-nav'
});

$('.intro-img .slider-nav').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.slider-for',
	dots: false,
	arrows: false,
	centerMode: true,
	focusOnSelect: true
});

$('.result-slid-dek').slick({
	dots: false,
	infinite: false,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 3,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			}
		}
	]
});


$(".use-img .play-pause-btn").on("click", function () {
	if ($(this).attr("data-click") == 1) {
		$(this).attr("data-click", 0);
		$("#video")[0].pause();
	} else {
		$(this).attr("data-click", 1);
		$("#video")[0].play();
	}
});


$('.banner-sec .slider-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.slider-nav'
});

$('.banner-sec .slider-nav').slick({
	slidesToShow: 3,
	slidesToScroll: 3,
	asNavFor: '.slider-for',
	dots: false,
	centerMode: true,
	focusOnSelect: true
});

$('.revi-dekstop').slick({
	dots: false,
	infinite: false,
	speed: 300,
	loop:true,
	slidesToShow: 3,
	slidesToScroll: 3,
	arrow:true,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		responsive: [
	{
		breakpoint: 991,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		} 
	},
]
});

$(function () {
	var list = $(".js-dropdown-list.list-1");
	var link = $(".js-link.link-1");
	link.click(function (e) {
		e.preventDefault();
		list.slideToggle(200);
	});
	list.find("li").click(function () {
		var text = $(this).html();
		var icon = '<i class="fa fa-chevron-down"></i>';
		link.html(text + icon);
		list.slideToggle(200);
		if (text === "* Reset") {
			link.html("Select one option" + icon);
		}
	});
});

$(function () {
	var list = $(".js-dropdown-list.list-2");
	var link = $(".js-link.link-2");
	link.click(function (e) {
		e.preventDefault();
		list.slideToggle(200);
	});
	list.find("li").click(function () {
		var text = $(this).html();
		var icon = '<i class="fa fa-chevron-down"></i>';
		link.html(text + icon);
		list.slideToggle(200);
		if (text === "* Reset") {
			link.html("Select one option" + icon);
		}
	});
});

$(function () {
	var list = $(".js-dropdown-list.list-3");
	var link = $(".js-link.link-3");
	link.click(function (e) {
		e.preventDefault();
		list.slideToggle(200);
	});
	list.find("li").click(function () {
		var text = $(this).html();
		var icon = '<i class="fa fa-chevron-down"></i>';
		link.html(text + icon);
		list.slideToggle(200);
		if (text === "* Reset") {
			link.html("Select one option" + icon);
		}
	});
});


$('.round1').attr('var-id','43216299819247');
$('.round2').attr('var-id','43216359555311');
$('.round3').attr('var-id','43216377217263');

$('.cust-round-1').attr('var-id','43216299819247');
$('.cust-round-2').attr('var-id','43216359555311');
$('.cust-round-3').attr('var-id','43216377217263');

//aaaaqqqq
let serum_images = {
	'43216299819247': {
		'1 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI2x-rejuv.jpg',
		'2 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI4x-rejuv.jpg',
		'3 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI6x-rejuv.jpg'
	},
	'43216359555311': {
		'1 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI2x-hydra.jpg',
		'2 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI4x-hydra.jpg',
		'3 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI6x-hydra.jpg'
	},
	'43216377217263': {
		'1 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI2x-mixed.jpg',
		'2 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI4x-mixed.jpg',
		'3 Month Supply': 'https://cdn.shopify.com/s/files/1/0441/1431/3365/files/MI6x-mixed.jpg'
	}
};

let set_image_variant = () => {
	let SupplyMonth =	$('.supply-link.active').attr('data-varid');
	let SerumVariant = $(".choose-link.active").parent().attr('var-id');

	console.log('SupplyMonth [' + SupplyMonth + ']');
	console.log('SerumVariant [' + SerumVariant + ']');

	if(serum_images[SerumVariant][SupplyMonth])
	{
		$('.landing-treatment .new-image img').attr('src', serum_images[SerumVariant][SupplyMonth]);	
	}
}

$('.supply-month .supply-link').on('click',function(){
	$('.supply-link').removeClass('active');
	$(this).addClass('active');
	set_image_variant();
});

$('.round1, .round2, .round3').on('click', function() {
	set_image_variant();
});

$('.trea-button').attr('data-product','43216359555311');
$('.landing-treatment-main-view .trea-button').attr('data-product','43216299819247');

//@start added by abconvert 31.08.2023
function updateVariant_satisfaction_form(data) {
	const groupIndex = _getProductIndex(data);
	if (groupIndex != 0) {
		const replaceVariantId = data.variantIds[groupIndex][0];
		$('form.satisfaction-form .product__supply').val(replaceVariantId.toString());
		console.log(`update variant to ${replaceVariantId}, groupIndex: ${groupIndex} - .satisfaction-form span.treatment-buy__button`);
	}
}

$(document).on("click", ".satisfaction-form span.treatment-buy__button", function (event) {
	event.preventDefault();
	var Supplay_Name = $('.supply-main.active').attr('data-varid');
	var Serums_Name = $('.cho-serum li.active').find('h3').text();

	if (Supplay_Name == '3 Month Supply' && Serums_Name == 'Rejuvenating Serum') {
		if (window.abconvertDict) {
			const productId = 7802862862575;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216299819247')
		}

	}
	else if (Supplay_Name == '2 Month Supply' && Serums_Name == 'Rejuvenating Serum') {
		if (window.abconvertDict) {
			const productId = 7802890092783;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216398450927')
		}

	}
	else if (Supplay_Name == '1 Month Supply' && Serums_Name == 'Rejuvenating Serum') {
		if (window.abconvertDict) {
			const productId = 7802905297135;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216457203951')
		}

	}
	else if (Supplay_Name == '3 Month Supply' && Serums_Name == 'Hydra-Soothing Serum') {
		if (window.abconvertDict) {
			const productId = 7802880229615;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216359555311')
		}

	}
	else if (Supplay_Name == '2 Month Supply' && Serums_Name == 'Hydra-Soothing Serum') {
		if (window.abconvertDict) {
			const productId = 7802897727727;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216434069743')
		}

	}
	else if (Supplay_Name == '1 Month Supply' && Serums_Name == 'Hydra-Soothing Serum') {
		if (window.abconvertDict) {
			const productId = 7802911981807;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216483942639')
		}

	}
	else if (Supplay_Name == '3 Month Supply' && Serums_Name == 'Rejuvenating + Hydra-Soothing Serums') {
		if (window.abconvertDict) {
			const productId = 7802884784367;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216377217263')
		}

	}
	else if (Supplay_Name == '2 Month Supply' && Serums_Name == 'Rejuvenating + Hydra-Soothing Serums') {
		if (window.abconvertDict) {
			const productId = 7802903003375;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216449208559')
		}

	}
	else if (Supplay_Name == '1 Month Supply' && Serums_Name == 'Rejuvenating + Hydra-Soothing Serums') {
		if (window.abconvertDict) {
			const productId = 7802912866543;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_satisfaction_form(data);
			}
		} else {
			$('form.satisfaction-form .product__supply').val('43216489513199')
		}
	}
});
//@end added by abconvert 31.08.2023

//aaaaqqqq
$('.infus-supply .supply-main').on('click',function(){
	$('.infus-supply .supply-main').removeClass('active');
	$(this).addClass('active');
	let CurrentPrice = $(this).find('.sup-price .ori-pri').text()
	let GetPriceSave = $(this).find('.sup-price .sav-price-hidden').text();
	
	let payprice = CurrentPrice.replace("$", "");
	let finalpayprice = payprice / 4;
	$('.payment-txt .new-pay-price').text('$'+finalpayprice);
	$('.payment-txt .pay-option').text(CurrentPrice);
	
	if(GetPriceSave)
	{
		$('.satisfaction-form .trea-button b').text(GetPriceSave);
		$('.satisfaction-form .treatment-buy__button').text('Buy Now & ' + GetPriceSave);
	}
	else 
	{
		$('.satisfaction-form .treatment-buy__button').text('Buy Now');
	}

});

$('.supply-month .supply-link').on('click',function(){
	let CurrentPrice = $(this).find('.new-price .new-price').text()
	let GetPriceSave = $(this).find('.new-price .newsave-price').text();
	let payprice = CurrentPrice.replace("$", "");
	let finalpayprice = payprice / 4;

	$('.payment-txt .new-pay-price').text('$'+finalpayprice);
	$('.payment-txt .pay-option').text(CurrentPrice);

	if(GetPriceSave)
	{
		$('.supply-detail .trea-button b').text(GetPriceSave);
		$('.supply-detail .treatment-buy__button').text('Buy Now & ' + GetPriceSave);
	}
	else 
	{
		$('.supply-detail .treatment-buy__button').text('Buy Now');
	}
});


//@start added by abconvert 31.08.2023
function updateVariant_supply_from(data) {
	const groupIndex = _getProductIndex(data);
	if (groupIndex != 0) {
		const replaceVariantId = data.variantIds[groupIndex][0];
		$('form.supply-form .product__supply').val(replaceVariantId.toString());
		console.log(`update variant to ${replaceVariantId}, groupIndex: ${groupIndex} - .supply-form span.treatment-buy__button`);
	}
}

$(document).on("click", ".supply-form span.treatment-buy__button, .landing-form span.treatment-buy__button", function () {
	var Supplay_Month_Name = $('.supply-link.active').attr('data-varid')
	var Select_Serums_Name = $('.new-treatment li a.active').find('h5:visible').text()

	console.log('Supplay_Month_Name[1] > ' + Supplay_Month_Name);
	console.log('Select_Serums_Name[2] > ' + Select_Serums_Name);

	let element = 'form.supply-form .product__supply, form.landing-form .product__supply';
	let element_button = '.supply-form button.treatment-buy__button, .landing-form button.treatment-buy__button';

	if (Supplay_Month_Name == '3 Month Supply' && Select_Serums_Name == 'Rejuvenating') {
		if (window.abconvertDict) {
			const productId = 7802862862575;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216299819247');
		}
	}
	else if (Supplay_Month_Name == '2 Month Supply' && Select_Serums_Name == 'Rejuvenating') {
		if (window.abconvertDict) {
			const productId = 7802890092783;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216398450927');
		}
	}
	else if (Supplay_Month_Name == '1 Month Supply' && Select_Serums_Name == 'Rejuvenating') {
		if (window.abconvertDict) {
			const productId = 7802905297135;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216457203951');
		}
	}
	else if (Supplay_Month_Name == '3 Month Supply' && Select_Serums_Name == 'Hydra-Soothing') {
		if (window.abconvertDict) {
			const productId = 7802880229615;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216359555311');
		}
	}
	else if (Supplay_Month_Name == '2 Month Supply' && Select_Serums_Name == 'Hydra-Soothing') {
		if (window.abconvertDict) {
			const productId = 7802897727727;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216434069743')
		}

	}
	else if (Supplay_Month_Name == '1 Month Supply' && Select_Serums_Name == 'Hydra-Soothing') {
		if (window.abconvertDict) {
			const productId = 7802911981807;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216483942639')
		}

	}
	else if (Supplay_Month_Name == '3 Month Supply' && Select_Serums_Name == 'Rejuvenating + Hydra-Soothing') {
		if (window.abconvertDict) {
			const productId = 7802884784367;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216377217263')
		}

	}
	else if (Supplay_Month_Name == '2 Month Supply' && Select_Serums_Name == 'Rejuvenating + Hydra-Soothing') {
		if (window.abconvertDict) {
			const productId = 7802903003375;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216449208559')
		}

	}
	else if (Supplay_Month_Name == '1 Month Supply' && Select_Serums_Name == 'Rejuvenating + Hydra-Soothing') {
		if (window.abconvertDict) {
			const productId = 7802912866543;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_supply_from(data);
			}
		} else {
			$(element).val('43216489513199')
		}

	}
	$(element_button)[0].click()

});


$(document).on('click','.new-treatment li',function(){
		var VarID = $(this).attr('var-id');
		$('.trea-button').attr('data-product',VarID);
		$('.product__supply').val(VarID);
});

$(document).on('click','.productaddtocart',function(event){
	event.preventDefault();
	var ProductID = $(this).find('a').attr('data-product');
	var ProductURL = 'https://qure-skincare.myshopify.com/cart/'+ProductID+':1';
	$('.trea-button').attr('href',ProductURL);
	var NewProductLink = $('.trea-button').attr('href');
	setTimeout(function() {
		window.location.href = NewProductLink;
	}, 2000);
	return false;
});

if ($('.round2 a.choose-link').hasClass("active")) {
	$('.sold-out-wrapper').addClass('extra-class');
}

$('.treatment-179 .landing-treatment-main-view .trea-button').attr('data-product','43959050273007');

//@start added by abconvert 31.08.2023
function updateVariant_treatment(data) {
	const groupIndex = _getProductIndex(data);
	if (groupIndex != 0) {
		const replaceVariantId = data.variantIds[groupIndex][0];
		$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', replaceVariantId.toString())
		console.log(`update variant to ${replaceVariantId}, groupIndex: ${groupIndex} - .treatment-179 span.landing_treatment_custom_btn`);
	}
}

$(document).on("click", ".treatment-179 span.landing_treatment_custom_btn", function () {

	var Supplay_Month_landing = $('.treatment-179 .landing-treatment-main-view .supply-link.active').attr('data-varid')
	var Select_Serums_landing = $('.treatment-179 .landing-treatment-main-view .new-treatment li a.active').find('h5').text()

	if (Supplay_Month_landing == '3 Month Supply' && Select_Serums_landing == 'Rejuvenating  Serum') {
		if (window.abconvertDict) {
			const productId = 7802862862575;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			//this variant id doesn't exist too
			// $('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43959050043631')
			// var theBundleProductsIS = 43959050043631
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216299819247')
			var theBundleProductsIS = 43216299819247
		}

	}
	else if (Supplay_Month_landing == '2 Month Supply' && Select_Serums_landing == 'Rejuvenating  Serum') {
		if (window.abconvertDict) {
			const productId = 7802890092783;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216398450927')
			var theBundleProductsIS = 43216398450927
		}

	}
	else if (Supplay_Month_landing == '1 Month Supply' && Select_Serums_landing == 'Rejuvenating  Serum') {
		if (window.abconvertDict) {
			const productId = 7802905297135;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216457203951')
			var theBundleProductsIS = 43216457203951
		}

	}
	else if (Supplay_Month_landing == '3 Month Supply' && Select_Serums_landing == 'Hydra-Soothing Serum') {
		if (window.abconvertDict) {
			const productId = 7802880229615;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			$('button.trea-button.treatmen-buy__landing-button').attr('data-product', '43959044112623')
			var theBundleProductsIS = 43959044112623
		}

	}
	else if (Supplay_Month_landing == '2 Month Supply' && Select_Serums_landing == 'Hydra-Soothing Serum') {
		if (window.abconvertDict) {
			const productId = 7802897727727;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216434069743')
			var theBundleProductsIS = 43216434069743
		}

	}
	else if (Supplay_Month_landing == '1 Month Supply' && Select_Serums_landing == 'Hydra-Soothing Serum') {
		if (window.abconvertDict) {
			const productId = 7802911981807;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216483942639')
			var theBundleProductsIS = 43216483942639
		}

	}
	else if (Supplay_Month_landing == '3 Month Supply' && Select_Serums_landing == 'Rejuvenating + Hydra-Soothing Serums') {
		if (window.abconvertDict) {
			const productId = 7802884784367;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			//this variant doesnt exist
			// $('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43959050273007')
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216377217263')
			var theBundleProductsIS = 43216377217263

		}
	}
	else if (Supplay_Month_landing == '2 Month Supply' && Select_Serums_landing == 'Rejuvenating + Hydra-Soothing Serums') {
		if (window.abconvertDict) {
			const productId = 7802903003375;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216449208559')
			var theBundleProductsIS = 43216449208559
		}

	}
	else if (Supplay_Month_landing == '1 Month Supply' && Select_Serums_landing == 'Rejuvenating + Hydra-Soothing Serums') {
		if (window.abconvertDict) {
			const productId = 7802912866543;
			const data = window.abconvertDict[productId];
			if (data) {
				updateVariant_treatment(data);
			}
		} else {
			$('.treatment-179 button.treatmen-buy__landing-button').attr('data-product', '43216489513199')
			var theBundleProductsIS = 43216489513199
		}

	}

	console.log("The Id Is: " + theBundleProductsIS)
	setTimeout(function () {
		$('.treatment-179 .landing-treatment-main-view .add_custom_id_on')[0].click()
	}, 1300)
});
//@end added by abconvert 31.08.2023

$("body").on("click", ".treatment .supply-link", function() {
	var text = $(this).find("span.new-price").text()
	text= text.replace("$","")
	text = parseInt(text)
	text = text / 4
	$(".monthly-pay-wrapper span").text(text)
})


$(document).on('click','.refil-serum-main',function(event){
	var product_ID = $(this).attr('data-variant-id'); 
	$('form.infusion-refill-form input.product__supply').val(product_ID)
});

$(document).on('click','#shopify-section-skin-supply .skin-supply-treat ul li',function(event){
	var product_ID = $(this).attr('data-variant-id'); 
	$('form.skin-supply-infusion-refill-form input.product__supply').val(product_ID)
});

$('.step-1-slider').slick({
	arrows: true,
	dots: false,
	vertical: true,
	slidesPerRow: 3,
	slidesToShow: 3,
	verticalSwiping: true    
});

var swiper = new Swiper(".mobile-design .result-slid .mySwiper", {
	slidesPerView: "auto",
	spaceBetween: 22,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});


$('.trus-slider .slider-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.slider-nav'
});

$('.trus-slider .slider-nav').slick({
	slidesToShow: 3,
	slidesToScroll: 3,
	asNavFor: '.slider-for',
	dots: false,
	centerMode: true,
	focusOnSelect: true
});

$(function () {
	var list = $(".choose .js-dropdown-list");
	var link = $(".choose .js-link");
	link.click(function (e) {
		e.preventDefault();
		list.slideToggle(200);
	});
	list.find("li").click(function () {
		var text = $(this).html();
		var icon = '<i class="fa fa-chevron-down"></i>';
		link.html(text + icon);
		list.slideToggle(200);
		if (text === "* Reset") {
			link.html("Select one option" + icon);
		}
	});
});

var swiper = new Swiper(".diff-table .mySwiper", {
	navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
});

var swiper = new Swiper(".shoul-slid .mySwiper", {
	slidesPerView: "auto",
	spaceBetween: 8,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
});

var swiper = new Swiper(".result-sli .mySwiper", {
	slidesPerView: "1",
	spaceBetween: 24,
	navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
});

$(".tabing-title .play-pause-btn-1").on("click", function () {
	if ($(this).attr("data-click") == 1) {
		$(this).attr("data-click", 0);
		$(".video-1")[0].pause();
	} else {
		$(this).attr("data-click", 1);
		$(".video-1")[0].play();
	}
});

setInterval(function(){
$('.drawer__cart-discounts p').each(function() {
var $p = $(this);
if($. trim($p. html())==='') {
		$p. remove();
}
});  
}, 500);

$(window).scroll(function(){
	if ($(this).scrollTop() > 50) {
		$('#q-rejuvalight-pro-facewear .header-wrapper').addClass('sticky');
	} else {
		$('#q-rejuvalight-pro-facewear .header-wrapper').removeClass('sticky');
	}
});

$(window).scroll(function(){
	if ($(this).scrollTop() > 50) {
		$('#micro-infusion-system .header-wrapper').addClass('sticky');
	} else {
		$('#micro-infusion-system .header-wrapper').removeClass('sticky');
	}
});

$(window).scroll(function(){
	if ($(this).scrollTop() > 50) {
		$('#micro-infusion-refill .header-wrapper').addClass('sticky');
	} else {
		$('#micro-infusion-refill .header-wrapper').removeClass('sticky');
	}
});

$(document).on('click','.button_atc',function(){
	$('.grow-aov__overlay').css('z-index','99');
	$('.grow-aov__backdrop').css('opacity','0');
	$('.grow-aov__backdrop').remove();

});

$(document).on('click','#mask_cross_sell',function(){ 
	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		data: {
			quantity: 1,
			id: 35987553419413
		},
		dataType: 'json', 
		success: function (data) { 
			$(".my-cart").load(location.href + " .my-cart");
			$('#mask-product .mfp-close').trigger('click');
		} 
	})
});

$(document).on('click','#mask-product .mfp-close',function(){
	window.location.href = "/checkout";
});    

$(document).on('click','.cart-sli-btn',function(event){ 
	event.preventDefault();
	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		data: {
			quantity: 1,
			id: 35987553419413
		},
		dataType: 'json', 
		success: function (data) { 
			$(".my-floating-cart").load(location.href + " .my-floating-cart");
		} 
	})
});

$(document).on('click','.cart_custom_upsell_atc',function(event){ 
	event.preventDefault();
	var UPSELLVariantID = $(this).attr('data-variantID');
	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		data: {
			quantity: 1,
			id: UPSELLVariantID
		},
		dataType: 'json', 
		success: function (data) { 
			$(".my-floating-cart").load(location.href + " .my-floating-cart");
		} 
	})
}); 

$('li .choose-link').on('click',function(){
	$('.choose-link').removeClass('active');
	$(this).addClass('active');
});

$('.supply-main').on('click',function(){
	$('.supply-main a').removeClass('active');
	$(this).addClass('active');
});

$('.cho-serum li').on('click',function(){
	$('.cho-serum li').removeClass('active');
	$(this).addClass('active');
});

$('li .pay-link').on('click',function(){
	$('.pay-link').removeClass('active');
	$(this).addClass('active');
});

$('.supply-month .supply-link').on('click',function(){
	let CurrentPrice = $(this).find('.new-price .new-price').text()
	let GetPriceSave = $(this).find('.new-price .newsave-price').text();
	let payprice = CurrentPrice.replace("$", "");
	let finalpayprice = payprice / 4;
	$('.payment-txt .new-pay-price').text('$'+finalpayprice);
	$('.payment-txt .pay-option').text(CurrentPrice);
	$('.supply-detail .trea-button b').text(GetPriceSave);
});

	$('.lp-video .lp-wrap').slick({
		dots: false,
		infinite: false,
		speed: 300,
		arrows: true,
		slidesToShow: 3,
		nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});  

if($(".benefits-title h2").length > 0)
{
	$(function () {
		var top =
			$(".benefits-title h2").offset().top -
			parseFloat($(".benefits-title h2").css("marginTop").replace(/auto/, 0));
		var footTop =
			$(".use-tabing").offset().top -
			parseFloat($(".use-tabing").css("marginTop").replace(/auto/, 0));

		var maxY = footTop - $(".benefits-title h2").outerHeight();

		$(window).scroll(function (evt) {
			var y = $(this).scrollTop();
			if (y > top) {
				if (y < maxY) {
					$(".benefits-title h2").addClass("fixed").removeAttr("style");
				} else {
					$(".benefits-title h2")
						.removeClass("fixed")
						.css({
							position: "static",
							top: maxY - top + "px"
						});
				}
			} else {
				$(".benefits-title h2").removeClass("fixed");
			}
		});
	});
}

$(".buyNow").click(function() {
		$('html, body').animate({
				scrollTop: $("#treatment").offset().top
		}, 2000);

});

$('.que-6').nextAll().css( "display", "none" );

$(".show-btn").click(function() {
		$('.que-6').nextAll().css( "display", "block" );
		$(this).hide();
		$(".hide-btn").show();
});

$(".hide-btn").click(function() {
		$('.que-6').nextAll().css( "display", "none" );
		$(this).hide();
		$(".show-btn").show();
});
$("#shopify-section-product-faq .show-btn").click(function() {
		$('.cus-5').nextAll().css( "display", "block" );
		$(this).hide();
		$(".hide-btn").show();
});
$("#shopify-section-product-faq .hide-btn").click(function() {
		$('.cus-5').nextAll().css( "display", "none" );
		$(this).hide();
		$(".show-btn").show();
});
$("#columnTwo").height($("#columnOne").height());

var modal = document.querySelector(".cus-modal");
var trigger = document.querySelector(".custom-popup.open-popup-link");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
	modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
	}
}

if(document.getElementById("show-widget") != null)
{
	document.getElementById("show-widget").addEventListener("click", function(event) {
		console.log('clicked..');
		event.preventDefault();
		$zopim(function() {
			$zopim.livechat.window.show();
		});
	});
}

if(document.getElementById("show-widget-2") != null)
{
	document.getElementById("show-widget-2").addEventListener("click", function(event) {
		console.log('clicked..');
		event.preventDefault();
		$zopim(function() {
			$zopim.livechat.window.show();
		});
	});
}

//setTimeout(function() {
	console.log("Run Script");
	// Configure/customize these variables.
	var showChar = 87;  // How many characters are shown by default
	var ellipsestext = "";
	var moretext = "Read More";
	var lesstext = "Read Less";
	
	$('.read_more_text').each(function() {
			var content = $(this).html();
			console.log(content.length);
			if(content.length > showChar) {
					$(this).addClass('show_less');
					$('<a href="#" class="morelink">Read more</a>').insertAfter('.read_more_text');
					//$(".morelink").addClass("less");
			}
	});

	$(".morelink").click(function(){
			if($(this).hasClass("less")) {
					$(this).removeClass("less");
					$(this).html(moretext);
					$('.read_more_text').addClass("show_less");
			} else {
					$('.read_more_text').removeClass("show_less");
					$(this).addClass("less");
					$(this).html(lesstext);
			}
			//$(this).parent().prev().toggle();
			//$(this).prev().toggle();
			return false;
	});
		$(".money-back a.less-link").click(function(){
			if($(this).hasClass("less")) {
					$(this).removeClass("less");
					$(this).html(moretext);
					$('.money-back .less-text').addClass("show_less");
			} else {
					$('.money-back .less-text').removeClass("show_less");
					$(this).addClass("less");
					$(this).html(lesstext);
			}
			return false;
	});
//}, 2000)

$(document).on("click", ".js-videoPoster", function (e) {
	e.preventDefault();
	var poster = $(this);
	var wrapper = poster.closest(".js-videoWrapper");
	videoPlay(wrapper);
});

function videoPlay(wrapper) {
	var iframe = wrapper.find(".js-videoIframe");
	var src = iframe.data("src");
	wrapper.addClass("videoWrapperActive");
	iframe.attr("src", src);
}

var vid = document.getElementById("myVideo"); 
function playVid() { 
	vid.play(); 
} 

var vid1 = document.getElementById("myVideo1"); 
	function playVid1() { 
	vid1.play(); 
} 
var vid2 = document.getElementById("myVideo2"); 
	function playVid2() { 
	vid2.play(); 
} 
var vid3 = document.getElementById("myVideo3"); 
	function playVid3() { 
	vid3.play(); 
} 
var vid4 = document.getElementById("myVideo4"); 
	function playVid4() { 
	vid4.play(); 
} 
var vid5 = document.getElementById("myVideo5"); 
	function playVid5() { 
	vid5.play(); 
} 
$('.confident-mobile-slider').slick({
	infinite: false,
	arrows: true,
	slidesToShow: 2,
	slidesToScroll: 2,
	prevArrow:"<button type='button' class='slick-prev pull-left'><svg class='slick-arrow' width='27' height='12' viewBox='0 0 27 12' fill='none' xmlns='http://www.w3.org/2000/svg' aria-disabled='false'><path d='M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z' fill='black' fill-opacity='0.8'></path></svg></button>",
	nextArrow:"<button type='button' class='slick-next pull-right'><svg class='slick-arrow' width='27' height='12' viewBox='0 0 27 12' fill='none' xmlns='http://www.w3.org/2000/svg' style=' aria-disabled='false'><path d='M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z' fill='black' fill-opacity='0.8'></path></svg></button>"
});

//aaaaqqqq
// if ($(window).width() < 767) {
// 	$('.confident-main').slick({
// 		infinite: false,
// 		arrows: false,
// 		dots:true,
// 		slidesToShow: 2,
// 		slidesToScroll: 1
// 	});
// };

var swiper = new Swiper(".instra-join .swiper-container", {
	pagination: ".swiper-pagination",
	slidesPerView: 2.2,
	centeredSlides: true,
	paginationClickable: true,
	loop: true,
	spaceBetween: 7,
	slideToClickedSlide: true
});

var slider1 = new Swiper ('.mob-how-slider', {
		slidesPerView: 1,
		pagination: {
				el: '.swiper-pagination',
				clickable: true
		},
});

var slider1 = new Swiper ('.skin-step .how-slider', {
		
		slidesPerView: 1,
		
		pagination: {
				el: '.swiper-pagination',
				clickable: true
		},
});

$(document).on('click','.skin-landing .star-rating__text',function(){
	$('html,body').animate({
				scrollTop: $("#shopify-section-review-custom").offset().top},
				'slow');
});

$(document).on('click','.sec-cont-rev a',function(){
		$('html,body').animate({
			scrollTop: $(".rev-slider-dek").offset().top},
		'slow');
});

$(document).on('click','.sec-cont-rev a.rev-add',function(){
		$('html,body').animate({
			scrollTop: $("#shopify-section-result-dekstop-mobile").offset().top},
		'slow');
});

if ($(window).width() < 767) {
	$(document).on('click','a.uses-cus.active',function(event){
			event.preventDefault();
			var swiper = new Swiper(".use-masks.swiper", {
			slidesPerView: "4",
			spaceBetween: 30,
			navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
			},
			pagination: {
					el: ".swiper-pagination",
				clickable: true
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
					640: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 1,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 30,
				},
			},
		});
	});
};

if ($(window).width() < 767) {
	$('#shopify-section-product-img-with-text .land-imgText-wrapper').slick({
		infinite: false,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow:"<button type='button' class='slick-prev pull-left'><svg class='slick-arrow' width='27' height='12' viewBox='0 0 27 12' fill='none' xmlns='http://www.w3.org/2000/svg' aria-disabled='false'><path d='M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z' fill='black' fill-opacity='0.8'></path></svg></button>",
		nextArrow:"<button type='button' class='slick-next pull-right'><svg class='slick-arrow' width='27' height='12' viewBox='0 0 27 12' fill='none' xmlns='http://www.w3.org/2000/svg' style=' aria-disabled='false'><path d='M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z' fill='black' fill-opacity='0.8'></path></svg></button>",
	});

	$('.serum-video .lp-wrap').slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
		prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
	});
};

$('.banner-cus-img-area').slick({
	dots: false,
	infinite: false,
	speed: 300,
	arrows: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	centerMode: true,
	centerPadding: '57.5px',
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
});

$('.collection-reiview .results-info .results_items').slick({
	dots: false,
	infinite: false,
	speed: 300,
	loop:true,
	slidesToShow: 3,
	slidesToScroll: 3,
	arrow:true,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		responsive: [
	{
		breakpoint: 991,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		} 
	},
	{
		breakpoint: 767,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		} 
	},
]
});

if ($(window).width() <= 481) {
	$('.collection-reiview .results-info .results_items').slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			rows: 0,
			infinite: false,
			nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
			prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>'
	})
}

$('.feel-out-slider').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: true,
	dots: true,
	infinite: false,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			} 
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
				prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
			} 
		},
	]
});

$(document).on("click",".row.third-image a.ingredient-class",function() {
		setTimeout(function() {
				$('.row.third-image .ingredients-slider-1').slick('refresh');
				$(".row.third-image .signific-image").toggleClass("change-width");
		}, 0);
});

$(document).on("click",".row.second-image a.ingredient-class",function() {
	setTimeout(function() {
			$('.row.second-image .ingredients-slider-1').slick('refresh');
			$(".row.second-image .signific-image").toggleClass("change-width");
	}, 0);
});

$(document).on("click",".row.first-image a.ingredient-class",function() {
		setTimeout(function() {
				$('.row.first-image .ingredients-slider-1').slick('refresh');
				$(".row.first-image .signific-image").toggleClass("change-width");
		}, 0);
});

$('.row.second-image .ingredients-slider-1').slick({
	slidesToShow: 2,
	slidesToScroll: 2,
	arrows: true,
	dots: true,
	infinite: false,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			} 
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
				prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
			} 
		},
	]
});

$('.row.third-image .ingredients-slider-1').slick({
	slidesToShow: 2.3,
	slidesToScroll: 2,
	arrows: true,
	dots: true,
	infinite: false,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
					responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			} 
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
				prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
			} 
		},
	]
});

$('.row.first-image .ingredients-slider-1').slick({
	slidesToShow: 2,
	slidesToScroll: 2,
	arrows: true,
	dots: true,
	infinite: false,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
					responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			} 
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
				prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
			} 
		},
	]
});


if ($(window).width() < 767) {
	$('.product-banner .serum-pro-banner').slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		centerMode: true,
		centerPadding: '52.5px',
		nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
		prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
	});



	
}; 

$(".hp-info__block-title").click(function(){
	$(this).toggleClass("active")
	$(this).next().slideToggle()
})

$('.hp-skincare-slider').slick({
	dots: true,
	infinite: true,
	speed: 300,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,      
});

//aaaaqqqq1
if ($(window).width() < 767) {
	$('.mask-confident .confident-main').slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1
	});
}

$('.watch-detail').slick({
	dots: true,
	infinite: false,
	speed: 300,
	arrows: false,
	slidesToShow: 3,
	slidesToScroll: 1,   
	responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				} 
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,             
				} 
			},
		]
});

if ($(window).width() < 992) {
		$('.bestseller-wrap').slick({
			dots: true,
			infinite: false,
			speed: 300,
			arrows: false,
			slidesToShow: 2,
			slidesToScroll: 1,   
			responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,   
						} 
					},
				]
		});
};

$("li.scrol-hp a").click(function(event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $(".hp-skincare-slider").offset().top
		}, 3000);
});

$("#qure-microinfusion-179 .intro-cont a.ins-btn, #qure-microinfusion-179 .banner-sec.trust a.slider-btn, #qure-microinfusion-179 .banner-sec.the-join a.slider-btn, #qure-microinfusion-179 a.system-btn, #qure-microinfusion-179 .trust a.slider-btn, #qure-microinfusion-179 .banner-sec.banner-sec-2 a.slider-btn").html(function () {
	return $(this).html().replace("43%", "40%"); 
});

$(".tabing-new .tab .tablinks").each(function (e) {
	if (e != 0) $(this).hide();
});

$(".tab_button .next-btn").click(function () {
	var count = $(".tabing-new .tab .tablinks:visible").next().addClass('active');
	if ($(window).width() < 767) {
		var tabcount = $('#Tokyo_6').html();
		$('.right_slider').slick('refresh');
	}
		
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
	if ($(window).width() < 767) {
		var tabcount = $('#Tokyo_6').html();
	$('.right_slider').slick('refresh');
	}
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
$('.tab_button').attr('page-count',NumberCount);

$('.contents-info .tablinks').on('click',function(){
	var NumberCount = $(this).attr('data-count');
	$('.tab_button').attr('page-count',NumberCount);
});

$('.next-btn').on('click',function(){
	$('video#myVideo4').get(0).pause();
});

$('.preview-btn').on('click',function(){
	$('video#myVideo4').get(0).pause();
});

if ($(window).width() < 767) {
	$('.right_slider').slick({
		infinite: false,
		arrows: false,
		dots:true,
		slidesToShow: 1,
		slidesToScroll: 1,
	}); 
};

if ($(window).width() < 767) {
	$('.infus-video-sli .lp-video .infusion-video-wrap').slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	});  
};

$(".stamped-badge").click(function() {
	$('html, body').animate({
		scrollTop: $(".reviews-section").offset().top
		}, 3000);
});

if(page_handle == 'faqs')
{
	$("#shopify-section-custom-faq").html(function (i, html) {
		return html.replace(/&nbsp;/g, '');
	});
	var countH2 = 0
	$("#shopify-section-custom-faq h2").each(function() {
		countH2 = countH2 + 1
		$(this).css("z-index", countH2)
	})
}

if(template.includes('product') || page_handle == 'microinfusion')
{
		$('.mask-banner .product-images-slider-mobile .satisfaction-image-area').slick({
			dots: true,
			infinite: false,
			speed: 300,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '52.5px',
			nextArrow:'<svg class="slick-next" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',
			prevArrow:'<svg class="slick-prev" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1 1L7 8L1 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>',      
		});
		$('.reasons .product-images-slider-mobile .satisfaction-image-area').slick({
		dots: true,
			infinite: false,
			speed: 300,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '52.5px',
		});
		setTimeout(function() {
			var mobImgHeight = $(".product-images-slider-mobile #slick-slide01 .satisfaction-img-mob.mob__img-full").height();
			$(".mob__img-full-gif").height(mobImgHeight)
		}, 500)

		setTimeout(function() {
			if ($(window).width() < 767) {
				var imgHeight = $(".more-right img.more-img").height()
				var vsPosition = (imgHeight /2) - 20
				$(".more-effective__img-wrapper").css("top", vsPosition)
			}
		}, 2000)
}

if(page_handle == 'less-wrinkles-with-led-light-therapy')
{
	document.addEventListener('scroll',()=>{
		function stickyTable() {
			var window_top = $(window).scrollTop();
			var div_top = $('.comp-col--full').offset().top - 100;
			var div_bottom = $('.comp-row--last').offset().top - 120;

			if (window_top > div_top) {
				$('.comp-row-head--full').addClass('make_it_sticky')
			} 
			//if window top reaches the limit removed class
			if(window_top < div_top){
				$('.comp-row-head--full').removeClass('make_it_sticky');
			}
			if (window_top > div_bottom ) {
				$('.comp-row-head--full').removeClass('make_it_sticky');
			}
		}
		$(window).scroll(stickyTable);
	})
	var headHeight = $('header').height()
	$('ul.dropdown-menu.mega-dropdown-menu.row').css('top',headHeight)
}

if(page_id == 93929930991 || page_id == 94502748399 || page_id == 94867718383)
{
	$('.buy-form__item').click(function(){
		$('.buy-form__item').removeClass('active')
		$(this).addClass('active')
		var price = $(this).find('.item-price--save span').text()
		$(this).parent().parent().find('.buy__btn-bundle em').text(price)
	})

	$('.buy__btn-bundle').click(function(){
		jQuery.post('/cart/clear.js');
		var form = $(this).attr('data-for')
		var discountCode
		setTimeout(() => {
			if ( $('.'+form+' .buy-form__item-1').hasClass('active')) {
				jQuery.post('/cart/add.js', $('#AddToCart2').serialize());
				console.log('Item Set 1')
				
				setTimeout(() => {
					window.location = '/checkout'
				}, 1300)
			}

			if ( $('.'+form+' .buy-form__item-2').hasClass('active')) {
				jQuery.post('/cart/add.js', {
					items: [
						{
							quantity: 1,
							id: 37390541553813
						},
						{
							quantity: 1,
							id: 35987553419413
						}
					]
				});
				setTimeout(() => {
					window.location = '/checkout?discount=QBUNDLE'
				}, 1300)
				console.log('Item Set 2')
			}

			if ( $('.'+form+' .buy-form__item-3').hasClass('active')) {
				jQuery.post('/cart/add.js', {
					items: [
						{
							quantity: 2,
							id: 37390541553813
						},
						{
							quantity: 3,
							id: 35987553419413
						}
					]
				});
				console.log('Item Set 3')
				setTimeout(() => {
					window.location = '/checkout?discount=QVALUEBUNDLE'
				}, 1300)
			}
		}, 300)
	})

	var imgTextTick = document.createElement('div')
	imgTextTick.classList.add('imgTxtTicks')
	imgTextTick.innerHTML = `
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="9" cy="9" r="8.5" stroke="#008763"/>
		<path d="M5 9L8 12L13.5 6.5" stroke="#008763" stroke-width="2"/>
				</svg>
		`

		$('.product__description p').wrap("<div class='product__description--list__items'></div>")
		$('.imgText-second__text--list p').wrap("<div class='imgText-second__text--list__items'></div>")
		$('.imtText__middle-text--list p').wrap("<div class='imtText__middle-text--list__items'></div>")
		$('.product__description p, .imgText-second__text--list p, .imtText__middle-text--list p').before(imgTextTick)

		var imgEl = $('.land-text__image-wrapper')
		var imgHeight = imgEl.height()
		var imgWidth = imgEl.width()
		var offsetTop = -(imgHeight /2)
		var windowWidth = window.innerWidth
		var offsetLeft = (windowWidth /2)- (imgWidth/2)
		imgEl.css('top',offsetTop)
		imgEl.css('left',offsetLeft)
		imgEl.css('transform','none')

		window.onresize = function() {
			var imgEl = $('.land-text__image-wrapper')
			var imgHeight = imgEl.height()
			var imgWidth = imgEl.width()
			var offsetTop = -(imgHeight /2)
			var windowWidth = window.innerWidth
			var offsetLeft = (windowWidth /2)- (imgWidth/2)
			imgEl.css('top',offsetTop)
			imgEl.css('left',offsetLeft)
			imgEl.css('transform','none')
		}

		$('.videos-wrapper').slick({
			infinite: true,
			arrows:false,
			dots:true,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				}
			]
		});

		$('.reviews-wrapper').slick({
			infinite: true,
			arrows:false,
			dots:true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});

		var widthGlobal = window.innerWidth;
		if (widthGlobal < 767) {
			$('.land-imgText-wrapper').slick({
				infinite: true,
				arrows:false,
				dots:true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		}

		window.addEventListener('resize', function(event) {
			var width = window.innerWidth;
			if (width < 767) {
				$('.land-imgText-wrapper').slick({
					infinite: true,
					arrows:false,
					dots:true,
					slidesToShow: 1,
					slidesToScroll: 1
				});
			}
		}, true);

		$('.video__placeholder-img').click(function(){
			var videoNum = $(this).attr('data-video-num')
			var videoSrc = $(this).attr('data-iframe-src')
			var videoType = $(this).attr('data-video-type')
			$('.video-'+videoNum).addClass('active')
			$('.video-popup-wrapper').addClass('active')
			$('.body-overlay').slideDown()
			$('.video-'+videoNum+' .iframe-video-player').attr('src',videoSrc)
			if (videoType == 'tiktok') {
				$('.video-popup-close').addClass('close__tiktok')
			}
		})

		$('.body-overlay').click(function(){
			$(this).slideUp()
			if ($('.video-popup__video.active').hasClass('popupVideo-type--youtube')) {
				var videoNodeYT = $('.video-popup__video.active .iframe-video-player').clone();
				$(".video-popup__video.active .iframe-video-player").remove()
				$(".video-popup__video.active").append(videoNodeYT)
			}
			if ($('.video-popup__video.active').hasClass('popupVideo-type--tiktok')) {
				var videoNodeTT = $(".video-popup__video.active .div-video-player blockquote").clone();
				$(".video-popup__video.active .div-video-player blockquote").remove()
				$(".video-popup__video.active .div-video-player").append(videoNodeTT)
			}
			$('.video-popup__video').removeClass('active')
			$('.video-popup-wrapper').removeClass('active')
			$('.video-popup-close').removeClass('close__tiktok')
		})

		$('.video-popup-close').click(function(){
			$('.body-overlay').slideUp()
			if ($('.video-popup__video.active').hasClass('popupVideo-type--youtube')) {
				var videoNodeYT = $('.video-popup__video.active .iframe-video-player').clone();
				$(".video-popup__video.active .iframe-video-player").remove()
				$(".video-popup__video.active").append(videoNodeYT)
			}
			if ($('.video-popup__video.active').hasClass('popupVideo-type--tiktok')) {
				var videoNodeTT = $(".video-popup__video.active .div-video-player blockquote").clone();
				$(".video-popup__video.active .div-video-player blockquote").remove()
				$(".video-popup__video.active .div-video-player").append(videoNodeTT)
			}

			$('.video-popup__video').removeClass('active')
			$('.video-popup-wrapper').removeClass('active')
			$('.video-popup-close').removeClass('close__tiktok')
		})

		$('.land-text__text .read-more-btn').click(function(){
			$('.land-text__text--more').slideToggle()
			$(this).text(function(i, text){
				return text === "Read More" ? "Read Less" : "Read More";
			})
		})

		$('.landing-anchor__btn').click(function(){
			var element = $(this).attr('data-href')
			var pos = $(element).position()
			$([document.documentElement, document.body]).animate({
				scrollTop: pos.top-76
			}, 1000);
		})

		$('.landing-btn.buy__btn').click(function(){
			jQuery.post('/cart/clear.js');
			jQuery.post('/cart/add.js', $('form[action="/cart/add"]').serialize());
			window.location = '/checkout'
		})

		$('.imgText__showMore').click(function(){
			var getNum = $(this).attr('data-num')
			$('.imgText__hidden[data-item="'+getNum+'"]').slideToggle()
			$(this).toggleClass('active')
			$(this).text(function(i, text){
				return text === "Read more" ? "Read less" : "Read more";
			})
		})

		$('.why-sec__option').click(function(){
			$('.why-sec__option').removeClass('active')
			$(this).addClass('active')
			var getNum = $(this).attr('data-option')
			$('.why-sec__item').removeClass('active')
			$('.why-sec__item[data-item="'+getNum+'"]').addClass('active')
		})

		$('.science-card__arrow.active').click(function(){
			var getNum = $(this).attr('data-item')
			var nextItem
			if ($(this).hasClass('arrowNext')) {
				nextItem = parseInt(getNum)+1
			}
			if ($(this).hasClass('arrowPrev')) {
				nextItem = parseInt(getNum)-1
			}
			$('.science-card__item').removeClass('active')
			$('.science-card__item[data-item="'+nextItem+'"]').addClass('active')
		})

		$('.faq__question').click(function(){
			$(this).toggleClass('faq__question--active')
			$(this).next().toggleClass('faq__answer--active')
			$(this).next().slideToggle()
		})

		$('.faq__ask-us span').click(function(){
			var link = $(this).attr('data-href')
			window.location = link
		})
}

if(page_title == 'Less Wrinkles with LED Light Therapy' || page_title == 'Less Acne with LED Light Therapy' || page_title == 'Mask Serum Bundle')
{
	setTimeout(() => {
		var bodyText = $('body').text()
		bodyText.replace('\u200B','')
		console.log('Removing white space')
	}, 1)
}

// if (window.location.pathname == '/pages/qure-micro-infusion-landing-page' ){
// 	$(function () {
// 		$(window).scroll(function(){
// 			console.log('scroll working');
// 			var top = $(".new-image").offset().top - parseFloat($(".new-image").css("marginTop").replace(/auto/, 0));
// 			var footTop = $("#shopify-section-what-you").offset().top - parseFloat($("#shopify-section-what-you").css("marginTop").replace(/auto/, 0));

// 			var maxY = footTop - $(".new-image").outerHeight();

// 			$(window).scroll(function (evt) {
// 				var y = $(this).scrollTop();
// 				if (y > top) {
// 					if (y < maxY) {
// 						$(".new-image").addClass("fixed").removeAttr("style");
// 						$(".new-supply").addClass("cus-class").removeAttr("style");
// 					} else {
// 						$(".new-image")
// 							.removeClass("fixed")
// 							.css({
// 								position: "absolute",
// 								top: maxY - top + "px"
// 							});
// 					}
// 				} else {
// 					$(".new-image").removeClass("fixed");
// 					$(".new-supply").removeClass("cus-class");
// 				}
// 			});
// 		});
// 	});
// }

$(".set > a").on("click", function() {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this)
			.siblings(".content")
			.slideUp(200);
			$(".set > a i")
			.removeClass("fa-minus")
			.addClass("fa-plus");
		} else {
			$(".set > a i")
			.removeClass("fa-minus")
			.addClass("fa-plus");
			$(this)
			.find("i")
			.removeClass("fa-plus")
			.addClass("fa-minus");
			$(".set > a").removeClass("active");
			$(this).addClass("active");
			$(".content").slideUp(200);
			$(this)
			.siblings(".content")
			.slideDown(200);
		}
	});

	$(".innew-set a").on("click", function() {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this)
			.siblings(".innew-set .content")
			.slideUp(200);
			$(".innew-set a i")
			.removeClass("fa-minus")
			.addClass("fa-plus");
		} else {
			$(".innew-set a i")
			.removeClass("fa-minus")
			.addClass("fa-plus");
			$(this)
			.find("i")
			.removeClass("fa-plus")
			.addClass("fa-minus");
			$(".innew-set a").removeClass("active");
			$(this).addClass("active");
			$(".innew-set .content").slideUp(200);
			$(this)
			.siblings(".innew-set .content")
			.slideDown(200);
		}
	});

	$(".set-innner a").on("click", function() {
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


$(window).resize(function () {
	if (window.innerWidth > 1199) {
		$(".mobile-design #menu").removeAttr("style");
	}
});

setTimeout(function() {
	$('#q-rejuvalight-pro-facewear #shopify-section-customer-review').css('visibility','visible');
}, 9500);

if (window.location.pathname == '/products/q-rejuvalight-pro-facewear' ){
	document.addEventListener('scroll',()=>{
		function stickyTable() {
			var window_top = $(window).scrollTop();
			var div_top = $('.comp-col--full').offset().top - 100;
			var div_bottom = $('.comp-row--last').offset().top - 120;

			if (window_top > div_top) {
				$('.comp-row-head--full').addClass('make_it_sticky')
			} 
			//if window top reaches the limit removed class
			if(window_top < div_top){
				$('.comp-row-head--full').removeClass('make_it_sticky');
			}
			if (window_top > div_bottom ) {
				$('.comp-row-head--full').removeClass('make_it_sticky');
			}
		}

		$(window).scroll(stickyTable);
		})
		var headHeight = $('header').height()
		$('ul.dropdown-menu.mega-dropdown-menu.row').css('top',headHeight)
}


$(".link1").click(function() {
	$('html, body').animate({
		scrollTop: $(".risk").offset().top
	}, 3000);
});


$(".link-mobile1").click(function() {
	$('html, body').animate({
		scrollTop: $(".money-back").offset().top
	}, 3000);
});

$("body").on("click", "button.treatmen-buy__landing-button", function(e) {
	if ( $(".treatmen-buy__landing-button").attr("data-product") != "") {
		var prodId = $("button.treatmen-buy__landing-button").attr("data-product")
		jQuery.post('/cart/clear.js');
		setTimeout(function() {
			jQuery.ajax({
				type: 'POST',
				url: '/cart/add.js', 
				data: { quantity: 1, id: prodId }, 
				dataType: 'json',
				success: console.log("Success! Product added!")
			});
		}, 500)

		setTimeout(function() {
			window.location = "/checkout"
		}, 1300)
	}
});

$("body").on("click", ".cus-tit0", function(e) {
	$('.how-slide-1').slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		slidesToShow: 3,
		dots:true,
		slidesToScroll: 1,
		centerMode: false,
		centerPadding: '40px',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '0px',
				},
			},
		],
});
});
$("body").on("click", ".cus-tit2", function(e) {
	$('.how-slide-3').slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		slidesToShow: 3,
		dots:true,
		slidesToScroll: 1,
	centerMode: false,
		centerPadding: '40px',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '0px',
				},
			},
		],
});
});
$("body").on("click", ".cus-tit1", function(e) {
	$('.how-slide-2').slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		slidesToShow: 3,
		dots:true,
		slidesToScroll: 1,
		centerMode: false,
		centerPadding: '40px',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '0px',
				},
			},
		],
});
});

$('.cus-tit1').click(function(){
	$(this).parent().toggleClass('sub-show');
});

$(".banner-slick").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots:true,
		centerMode: true,
		centerPadding:'165px',
});

$("body").on( "click", ".formula-info .accordion__title, .formula-area .accordion__title, .question-ans .accordion__title", function() {
	$(this).toggleClass("accordion__title_active");
	$(this).next().toggleClass("accordion__panel_active");
});

$(".a.buy-now-btn.buyNow").click(function() {
	$('html, body').animate({
		scrollTop: $("#treatment").offset().top
	}, 3000);
});

const $popup = $(".video-text-section .video-popup");
const $modal = $(".video-text-section #modal");
const $closeIcon = $(".video-text-section .close");
const $watchMoreLink = $(".js-open-modal");

$watchMoreLink.click(function (e) {
	$popup.fadeIn(200);
	$modal.fadeIn(200);
	e.preventDefault();
});

$closeIcon.click(function () {
	$popup.fadeOut(200);
	$modal.fadeOut(200);
});

$(document).on("keyup", function (e) {
	if (e.key === "Escape") {
		$popup.fadeOut(200);
		$modal.fadeOut(200);
	}
});

$modal.on("click", function (e) {
	$popup.fadeOut(200);
	$modal.fadeOut(200);
});

$('.mobile-design .new-slick').slick({
	dots: false,
	infinite: false,
	arrows: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
});

$(".open-popup-link").magnificPopup({
	type: "inline",
	midClick: true,
	fixedContentPos: false,
	mainClass: "mfp-fade",
	callbacks: {
		open: function() {
			jQuery('html').addClass('noscroll');
		},
		close: function() {
			jQuery('html').removeClass('noscroll');
		}
	}
});

$('.dermatologist-feature').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.dermatologis-thumbnail'
});

$('.dermatologis-thumbnail').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.dermatologist-feature',
	dots: false,
	centerMode: false,
	focusOnSelect: true,
	responsive: [
		{
		breakpoint: 768,
		settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3
		}
		},
		{
		breakpoint: 481,
		settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				centerMode: true,
				centerPadding: '100px',
				infinite: true
		}
		}
	]
});

$('.results_items').slick({
	dots: true,
	infinite: false,
	speed: 300,
	loop:true,
	slidesToShow: 3,
	slidesToScroll: 3,
	arrow:false,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
		responsive: [
	{
		breakpoint: 991,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		} 
	},
	{
		breakpoint: 767,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		} 
	},
]
});

$('.reason-step-slider').slick({
	dots: true,
	infinite:false,
	speed: 300,
	arrows: false,
	slidesToShow: 3,
	loop:false,
	slidesToScroll: 1,
	nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
	prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
});

if ($(window).width() <= 481) {
	$('.difference-contents').slick({
			arrows: false,
			dots: true,
			infinite: false,
			slidesToShow: 1,
			centerMode:false,
			nextArrow: '<svg class="slick-next" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>',
			prevArrow: '<svg class="slick-prev" width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.0835C0.585786 5.0835 0.25 5.41928 0.25 5.8335C0.25 6.24771 0.585786 6.5835 1 6.5835L1 5.0835ZM26.5303 6.36383C26.8232 6.07094 26.8232 5.59606 26.5303 5.30317L21.7574 0.530197C21.4645 0.237304 20.9896 0.237304 20.6967 0.530197C20.4038 0.823091 20.4038 1.29796 20.6967 1.59086L24.9393 5.8335L20.6967 10.0761C20.4038 10.369 20.4038 10.8439 20.6967 11.1368C20.9896 11.4297 21.4645 11.4297 21.7574 11.1368L26.5303 6.36383ZM1 6.5835L26 6.5835L26 5.0835L1 5.0835L1 6.5835Z" fill="black" fill-opacity="0.8"/></svg>'
	});
}

$('ul.form-slide').slick({
	dots: false,
	infinite: false,
	speed: 300,
	arrows: false,
	slidesToShow: 6,
	slidesToScroll: 6,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3,
				dots: true,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				dots: true,
				slidesToScroll: 1
			}
		}
	]
});

var slider1 = new Swiper ('.how-slider', {
	slidesPerView: 1,
	pagination: {
			el: '.swiper-pagination',
			clickable: true
	},
});

$('.steps').slick({
	arrows: true,
	dots: false,
	vertical: true,
	slidesToShow: 3,
	verticalSwiping: true,
	centerMode:false,
	infinite: false,
	responsive: [
		{
			breakpoint: 480,
			settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false
			}
		}
	]
});

$("#three_month").click(function() {
	$("#three_month_list").toggle();
	$(this).toggleClass("active");
});

$("#two_month").click(function() {
	$("#two_month_list").toggle();
	$(this).toggleClass("active");
});

$("#one_month").click(function() {
	$("#one_month_list").toggle();
	$(this).toggleClass("active");
});

$("#bf-mobile-button").click(function() {
	$('html, body').animate({
		scrollTop: $("#BFBundles_1").offset().top
	}, 2000);
});

$("#bf-desktop-button").click(function(e) {
	e.preventDefault()
	console.log("btn click")
	$('html, body').animate({
		scrollTop: $("#BFBundles_1").offset().top
	}, 2000);
});

if (typeof __engine_scripts_queue['preselect-variant'] === 'function') {
	__engine_scripts_queue['preselect-variant']();
}