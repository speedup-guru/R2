$('.monthly_plans').click(function () {
  var savedTxt = $(this).find('.saved_price').html();
  if (savedTxt !== undefined) {
    $('.savedAmount').html('& ' + savedTxt);
  } else {
    $('.savedAmount').html('');
  }

  var paymentPrice = $(this).attr("payment-price");
  if (paymentPrice !== undefined) {
    $('.payment_price').html(paymentPrice);
  } else {
    $('.payment_price').html('');
  }
})
//element height
var maxHeight = 0;
$(".bs_feature ul li").each(function () {
  if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
  $(this).wrapInner("");
});
$(".bs_feature ul li").height(maxHeight);