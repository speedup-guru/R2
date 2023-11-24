function Safety(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

let clickfunc = (e, link_num) => {
    e.preventDefault();
    let data_count = 0;
    if (link_num == 1) {
        data_count = 6;
    }
    if (link_num == 2) {
        data_count = 4;
    }
    if (link_num == 3) {
        data_count = 10;
    }
    var button = document.querySelector('button[data-count="' + data_count + '"]');
    console.log(button);
    if (button && data_count > 0) {
        button.click();

        $(".hamburger").trigger('click');
        // if(view_mode == 'mobile'){ }
        $('html, body').animate({
            scrollTop: $(".tab_slider").offset().top
        }, 3000);
    }
}
