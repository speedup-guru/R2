$('.subscriptionType').click(function () {
    
    if($(this).attr("data-subscription") == 'subscription'){
        $(this).closest('.subscribe_save_wrapper').addClass('with_subscription').removeClass('without_subscription');
    }
    else if ($(this).attr("data-subscription") == 'no-subscription') {
        $(this).closest('.subscribe_save_wrapper').addClass('without_subscription').removeClass('with_subscription')
    }
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
})