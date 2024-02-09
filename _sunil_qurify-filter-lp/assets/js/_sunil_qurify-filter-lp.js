$('.thumbs img').click(function () {
    $('.largeImage').attr('src', $(this).attr('src').replace('thumb', 'large'));
    $(this).addClass('current').siblings().removeClass('current');
});
