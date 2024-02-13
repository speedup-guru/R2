//bundle JS

$('.tab_content').not(':first').hide();


// Bind click event to tabs links
$('.step_conten_blocks .planBlock').click(function () {
  var regular_price = $(this).find(".regular_price").text();
  var sale_price = $(this).find(".sale_price").text();
  console.log(regular_price);

  var imageLink = $(this).attr("data-image");
  var data_per = $(this).attr("data-per");
  var data_pay = $(this).attr("data-pay");


  $(".total_price").find(".regular_price").text(regular_price);
  $(".total_price").find(".sale_price").text(sale_price);
  $(".btn_value").text(data_per);
  $(".pay_today").text(data_pay);

  // Set the new value of the span element.



  $("#choosen_image").attr("src", imageLink);
  //Hide all tab content
  $('.tab_content').hide();

  // Remove active class from all tabs links
  $('.step_conten_blocks .planBlock').removeClass('active');

  // Add active class to clicked tab link
  $(this).addClass('active');

  // Get data-tab attribute value
  var tab = $(this).data('tab');

  // Show corresponding tab content
  $('#' + tab).show();
});

//product subscription
$(document).ready(function () {

  var data_month1_image = $(".serum_img.active").attr('data-month1-image');
  var data_month2_image = $(".serum_img.active").attr('data-month2-image');
  var data_month3_image = $(".serum_img.active").attr('data-month3-image');


  $(".planBlock").each(function () {
    var data_tab = $(this).attr("data-tab");
    if (data_tab == "month_3") {
      $(this).attr("data-image", data_month3_image);
    } else if (data_tab == "month_2") {
      $(this).attr("data-image", data_month2_image);
    } else if (data_tab == "month_1") {
      $(this).attr("data-image", data_month1_image);
    }
  });

  // var imageLinks = $(".step_conten_blocks a.planBlock.active").attr('data-image');
  // $("#choosen_image").attr("src", imageLinks);
  $(".serumBlock").click(function () {
    var imageLinkss = $(".step_conten_blocks a.planBlock.active").attr('data-image');
    $("#choosen_image").attr("src", imageLinkss);
    // Remove the "active" class from all serum_img elements
    $(".serum_img").removeClass("active");
    // Remove the "checked" attribute from all radio buttons
    $("input[name='serum']").prop("checked", false);
    $("input[name='serum']").removeClass("active");
    // Add the "active" class to the clicked serum_img
    $(this).find(".serum_img").addClass("active");
    // Set the "checked" attribute on the radio button within the clicked serumBlock
    $(this).find("input[name='serum']").prop("checked", true);
    $(this).find("input[name='serum']").addClass("active");
    var data_month1_image = $(".serum_img.active").attr('data-month1-image');
    var data_month2_image = $(".serum_img.active").attr('data-month2-image');
    var data_month3_image = $(".serum_img.active").attr('data-month3-image');
    $(".planBlock").each(function () {
      var data_tab = $(this).attr("data-tab");
      if (data_tab == "month_3") {
        $(this).attr("data-image", data_month3_image);
      } else if (data_tab == "month_2") {
        $(this).attr("data-image", data_month2_image);
      } else if (data_tab == "month_1") {
        $(this).attr("data-image", data_month1_image);
      }
    });
  });

});