$(".serumBlock").click(function () {
    var imageLinkss = $(this).find(".serum_img").attr('data-month3-image');
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

  });