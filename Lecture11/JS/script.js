$(document).ready(function(){
/*
$('#dialog1').dialog();
$('.container').draggable();
$('#sortable').sortable();*/
$('#btn1').click(function(){

  $('#firstParagraph1').fadeIn(3000, function(){

    $('#message').text('Text is ready to read');
  });

});

$('#btn2').click(function(){

$('#firstParagraph1').fadeOut(3000);

});
$('#btn3').click(function(){

//$('#firstParagraph1').fadeToggle(3000);


$('.box2').animate({
left:500,
height:'300px',
width:'300px',
opacity:'0.5'
});
});


$('#btn4').click(function(){

$('.box2').animate({
left:0,
height:'50px',
width:'50px',
opacity:'1'
});
});

$('#btn5').click(function(){
var box =$('.box2');
box.animate({
left:300,
height:'50px',
width:'50px',
opacity:'0.7'
});

box.animate({
top:100,
height:'70px',
width:'70px',
opacity:'0.7'
});

box.animate({
top:100,
left:0,
height:'20px',
width:'20px',
opacity:'0.4'
});

box.animate({
top:0,
left:0,
height:'110px',
width:'110px',
opacity:'1'
});


});


$('#btn6').click(function(){

$.getJSON('USD.json',function(data){

console.log(data);
$.each(data.rates,function(key,value){
  $('ul#ratesList').append('<li>'+key+ ' ' + value +'</li>');
})
});


});


$('#btn7').click(function(){

$.ajax({method:'GET',
        url:'http://universities.hipolabs.com/search?country=Korea,+Republic+of',
        dataType:'json'}
      ).done(function(data){
        $.map(data,function(univerty,i){

$('ul#ratesList').append('<li>'+univerty.name+ ' ' + univerty.domains +'</li>');


        });
        });

}) ;


});
