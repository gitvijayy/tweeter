/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  
  const createTweetElement = (tweet) => {

    let tweetPost = $('<article>');
    tweetPost.append($(`<img src = ${tweet.user.avatars["small"]}>`));
    tweetPost.append($(`<h2>`).text(tweet.user.name))
    tweetPost.append($(`<h3>`).text(tweet.user.handle))
    tweetPost.append($(`<p>`).text(tweet.content.text))
    tweetPost.append($(`<footer>`).text(convertMS(Date.now() - tweet.created_at)))
    return tweetPost;

  }

  const renderTweets = (tweets) => {

    tweets = tweets.sort((a, b) => b.created_at - a.created_at);
    $('.tweets-container').empty();
    
    tweets.forEach((tweetData) => {
      let $tweet = createTweetElement(tweetData);
      $('.tweets-container').append($tweet);
    });

  };

  const getTweets = () => {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function (tweetData) {
        renderTweets(tweetData);
      });
  }

  const $button = $('#load-tweets');

  $button.on('submit', function (event) {

    event.preventDefault();
    //$(".new-tweet h5").remove();
    
    const error = $('.char').val();
    if ( error === "") {
      //$(".new-tweet").append('<h5>')
      $(".error").slideDown();
      $(".error").text("Invalid tweet");
      //$(".new-tweet h5").text("Invalid tweet").css({"margin": "0", "color": "red", "text-align": "center"})
    } else if (error.length>140) {
      $(".error").slideDown();
      $(".error").text("Tweet too long");
      //$(".new-tweet").append('<h5>')
      //$(".new-tweet h5").text("Tweet too long").css({"margin": "0", "color": "red", "text-align": "center"})
    } else {
      $(".error").slideUp();
 
$.post("/tweets", $(this).serialize())
$(this).trigger("reset");

getTweets()   
getTweets();
    }
   
  });

  getTweets()
  getTweets();

});


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