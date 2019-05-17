/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery`s document ready function
 */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery`s document ready function
 */
$(document).ready(() => {

  const createTweetElement = (tweet) => {

    let header = $(`<header>`)
      .append($(`<img src = ${tweet.user.avatars[`small`]}>`))
      .append($(`<h2>`).text(tweet.user.name))
      .append($(`<h3>`).text(tweet.user.handle))
    let content = $(`<p>`).text(tweet.content.text)

    let likeCounter = $(`<i class = "like-count">`).text(tweet.likes)

    let footer = $(`<footer>`)
      .append($(`<h5>`).text(`${convertMS(Date.now() - tweet.created_at)}`))
      .append(likeCounter)
      .append($(`<i class = "like">`).text(`👍`))
      .append($(`<i class = "retweet" >`).text(`🔃`))
      .append($(`<i class = "flag">`).text(`🚩`))

    return $(`<article id = ${tweet._id}>`).append(header, content, footer);

  }

  const renderTweets = (tweets) => {
    tweets = tweets.sort((a, b) => b.created_at - a.created_at);
    $(`.tweets-container`).empty();
    tweets.forEach((tweetData) => {
      let $tweet = createTweetElement(tweetData);
      $(`.tweets-container`).append($tweet);
    });
  };

  const getTweets = () => {
    $.ajax(`http://localhost:8080/tweets`, { method: `GET` })
      .then(function (tweetData) {
        console.log("ajax query")
        renderTweets(tweetData);
      });
  }

  //on click of tweet button if valid creates a new tweet
  const $tweetButton = $(`#load-tweets`);
  $tweetButton.on(`submit`, function (event) {
    event.preventDefault();
    const error = ($(`.char`).val()).trim();
    if (error === ``) {
      $(`.error`).slideDown();
      $(`.char`).val("");
      $(`.error`).text(`Invalid tweet`);
    } else if (error.length > 140) {
      $(`.error`).slideDown();
      $(`.error`).text(`Tweet too long`);
    } else {
      $.ajax({
        type: 'POST',
        url: `/tweets`,
        data: $(this).serialize(),
        success: () => {
          $(`.error`).slideUp();
          getTweets();
        },
        error: () => {
          $(`.error`).slideDown();
          $(`.error`).text(`404: Try Again!`)
        }
      });
      $(this).trigger(`reset`);
      $(`.counter`).text("140");
    }
  });
  
  //toggles the new tweet section and gives it focus
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
  getTweets();
});

//to calculate the date in days years etc.. 
const convertMS = (milliseconds) => {
  var days, hrs, mins, secs, year;
  secs = Math.floor(milliseconds / 1000);
  mins = Math.floor(secs / 60);
  secs = secs % 60;
  hrs = Math.floor(mins / 60);
  mins = mins % 60;
  days = Math.floor(hrs / 24);
  hrs = hrs % 24;
  year = Math.floor(days / 365);
  days = days % 365;
  if (year > 0) {
    return `${year} year ago`;
  } else if (days > 0) {
    return `${days} day ago`;
  } else if (hrs > 0) {
    return `${hrs} hr ago`;
  } else if (mins > 0) {
    return `${mins} min ago`;
  } else {
    return `${secs} sec ago`;
  }
}

//To-do Code for stretch work
// $(document).on("mouseover", ".tweets-container article" ,function(){
//   if($(".like-count").text() == 0) {
//     $(".like-count").css("visibility","hidden")
//   }else {
//     $(".like-count").css("visibility","visible")
//   }
// });

$(document).on("click", ".like", function () {
  let _id = $(this).parent().parent().attr('id')
  console.log(_id)
  let count = $(this).siblings(".like-count").text()
  if (count == 0) {
    count++
    $(this).siblings(".like-count").text(count)
  } else {
    count--
    $(this).siblings(".like-count").text(count)

  }
  $.ajax(`/tweets/${_id}/${count}`, { method: `POST` })
});
