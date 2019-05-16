$(document).ready(function () {
  // --- our code goes here ---
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

  $('a').click(function (event) {
    // var id = $(this).attr("id");
    // alert(id);

    console.log("ad")
});


  // $(`.flag`).click(function(e) {
  //   e.preventDefault();
  //       //Do stuff when clicked
  //       console.log("ad")
  //   });
});