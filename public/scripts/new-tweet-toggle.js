$(document).ready(function () {
  const $composeButton = $(`#nav-bar input`);
  $composeButton.on(`click`, function () {
    if (document.cookie.length) {
      let $newTweet = $(`.new-tweet`);
      if ($newTweet.css(`display`) === `none`) {
        $newTweet.slideDown();
        $(this).removeClass(`not-clicked`).addClass(`clicked`)
      } else {
        $newTweet.slideUp();
        $(this).removeClass(`clicked`).addClass(`not-clicked`)
      }
      $(`.error`).slideUp();
      $(`#load-tweets .char`).focus();
      //console.log(1, document.cookie.length)
    } else {
      let $loginRegister = $(`.login-register`);
      if ($loginRegister.css(`display`) === `none`) {
        $loginRegister.slideDown();
        $(this).removeClass(`not-clicked`).addClass(`clicked`)
      } else {
        $loginRegister.slideUp();
        $(this).removeClass(`clicked`).addClass(`not-clicked`)
      }
      $(`.error`).slideUp();
      $(`.username`).focus();
    }
  })
  if (!document.cookie.length) {
    $(`#nav-bar input`).val("Login/Register")
    $(`#nav-bar input`).css("width", "200px")
    
  } else {
    $(`#nav-bar input`).val("Compose")
    $(`#nav-bar input`).css("width", "120px")
    $(`.login-status`).text(`Logged in as ${(document.cookie).split("=")[1]}`);
    $(`.logout`).text("Logout")
  }
});