$(document).ready(function () {
    $('#btn1').click(function () {

        // $('#firstParagraph1').css('color','grey');
        // $('#firstParagraph1').css('background','white');
        $('#firstParagraph1').css({color: 'grey', background: 'white'});
        $('.secondParagraph2').addClass('highlighted');

        // $('ul.list').empty();
        // $('ul.list').detach();

        // $('a').attr('target','_blank');
        // $('a').removeAttr('href');
        $('p').wrapAll('<h3>')
    });

    $('#btn2').click(function () {
        // $('.secondParagraph2').removeClass('heighlited');
        $('.secondParagraph2').toggleClass('highlighted');
        $('.contents').text('This is text added from JS');
        $('.contents').append('<h2>This is for testing</h2>');
        $('.contents').prepend('<h1>This is the title of the contents</h1>');
        $('ul.list').prepend('<li>text0</li>');
        $('ul.list').append('<li>text6</li>');

        /*
        $('ul.list').before('<button id="btn3" type="button" name="button">Click3</button>')
        $('#btn3').click(function(){

        alert('this is click from btn3');
        });
        */

        let listElements = $('ul.list').toArray();
        $.each(listElements, function (i, value) {
            console.log(value);
        });

    });

    $('#newElement').keyup(function (e) {

        let pressedKey = e.which;
        if (pressedKey == 13) {
            e.preventDefault();
            $('ul.list').append('<li>' + e.target.value + '</li>');
            $('#newElement').val('');
        }

    });


});
