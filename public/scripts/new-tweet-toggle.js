$(document).ready(function () {

const $composeButton = $(`#nav-bar input`);
  $composeButton.on(`click`, function () {

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

  })

});