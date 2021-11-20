$(document).ready(function () {

    /*
    localStorage.setItem("userColor", "red");
    localStorage.setItem("userfontsize", "50px");
    localStorage.removeItem('userfontsize');
    console.log(localStorage.getItem('userColor'));
    localStorage.clear();
    sessionStorage.setItem("userColor", "red");
    sessionStorage.setItem("userfontsize", "50px");
    sessionStorage.removeItem('userfontsize');
    console.log(sessionStorage.getItem('userColor'));
    sessionStorage.clear();
    */
    let expireDate = new Date(Date.now() + (1000 * 60 * 60 * 24));
    document.cookie = 'color=red; expires=' + expireDate.toUTCString();

    if (localStorage.getItem('websiteColor') !== null) {

        $('body').css('background', localStorage.getItem('websiteColor'));

    }


    $('#colorpicker').focusout(function () {
        let color = $('#colorpicker').val();
        localStorage.setItem('websiteColor', color);
        $('body').css('background', localStorage.getItem('websiteColor'));

    });

});
