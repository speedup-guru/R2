
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
$("body").on("click" , ".mobile-dropdown" , function(){
	$(".faq-menu").slideToggle();
});

$(".faq-menu__url").click(function(){
	if($(window).width() <= 767){
		var activestr = $(this).text();
		var activesvg = $('.faq-menu__item.active .faq-menu__item-img-wrapper').html();
		//var activeImg = $(".faq-menu__item.active img").attr("src");
		console.log(activestr);
		console.log(activesvg);
		//$(".mobile-dropdown__content-img").attr("src",activeImg);
		$(".mobile-dropdown-svg").html(activesvg);
		$(".mobile-dropdown span").text(activestr);
		$(".faq-menu").hide();
	}
});
$(".custom-warranty-link, .custom-warranty-link span").click(function(e){
    e.preventDefault()
    $(".faq-menu__item").removeClass("active");
    $(".faq-menu__item:nth-child(1)").addClass("active");
    var el = $(".faq-menu__item:nth-child(1) a"),
    target = el.attr('href'),  
    indiTarget = $('[data-id="'+target+'"]');
    $(target).add(indiTarget).addClass('active').siblings().removeClass('active');
    $("html, body").animate({
            scrollTop: 400
    }, 200);    
});

$('a.faq-menu__url[href*="#"]:not([href="#"])').click(function () {
	var target = $(this.hash);
	$('html,body').stop().animate({
	  scrollTop: target.offset().top - 220
	}, 'linear');
  });

$("a.faq").click(function() {
	$('html, body').animate({
		scrollTop: $("#shopify-section-landing-faq").offset().top
	}, 3000);
});