$(document).ready(function () {
    //$('h1').hide();
    //$('.container').hide();
    //$('.container p').hide();
    //$('#subjectID').hide();
    $('#mainParagraph span').css('color', 'red');
    //$('#mainParagraph span').css('background','black');
    //$('#list li:even').css('font-size','1.5em');
    $('ul li:nth-child(3n)').css('font-size', '1.5em');
    $(':text').css('background', 'pink');
    $('[href="www.cs.skku.edu"]').css('font-size', '2em');
    $('#mainParagraph').append(" this is extra text to the end of the paragraph");
    $('p').append(' extra').css('background', 'red');
    /*
    $('#but1').click(function(){
    $('#mainParagraph').hide();
    });

    $('#but1').click(function(){
    $('#mainParagraph').toggle();
    });

    $('#but2').on('click',function(){

      $('#mainParagraph').show();
    });
    */
    $('#but1').dblclick(function () {
        $('#subjectID').css('color', 'black');
    });
    /*
    $('#but1').hover(function(){
    $('#list li:odd').css('color','green');
    });
    */
    $('#but1').on('mouseenter', function () {
        $('#list li:odd').css('color', 'green');
    });

    $('#but1').on('mouseleave', function () {
        $('#list li:odd').css('color', 'white');
    });

    $('#but2').on('mouseup', function () {
        $('p').css('color', 'black');
    });
    $('#but2').on('mousedown', function () {
        $('p').css('color', 'white');
    });
    $('#but2').focusin(function () {
        $('a').css('color', 'pink');
    });

    $(':text').focusin(function () {

        $(this).css('background', 'blue');
    });
    /*
    $(':text').focusout(function(){

      $(this).css('background','white');
    });
    */
    $(':text').blur(function () {
        $(this).css('background', 'white');
    });

    $(document).on('mousemove', function (e) {
        $('#cord').html('mouse cord x = ' + e.clientX + ', cord y = ' + e.clientY);

    })

    $(':text').keydown(function (e) {
        $('#mainParagraph').append(e.target.value);
    });

    $('.form').submit(function (e) {

        e.preventDefault();
        let name = $('#name').val();
        let course = $('#course').val();
        alert(name + course);
    });

});
