$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet textarea.char").keyup(function(){

    const totalChars = $(this).val().length;
    const balanceChars = 140 - totalChars;
    
    $(this).siblings('.counter').text(balanceChars)

    if(balanceChars<0){
      $(this).siblings('.counter').css( "color", "red" )
    } else {
      $(this).siblings('.counter').css( "color", "initial" )
    }

  });
});