$(document).ready(function () {
  
  $(".new-tweet textarea.char").keyup(function () {
    
    const totalChars = $(this).val().length;
    const balanceChars = 140 - totalChars;
    $(this).siblings('.counter').text(balanceChars)
    if (balanceChars < 0) {
      $(this).siblings('.counter').css("color", "red")
    } else {
      $(this).siblings('.counter').css("color", "#f8f9fa")
    }
  });
  
});