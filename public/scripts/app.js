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
    let tweetPost = $(`<article>`);
    tweetPost.append($(`<img src = ${tweet.user.avatars[`small`]}>`));
    tweetPost.append($(`<h2>`).text(tweet.user.name))
    tweetPost.append($(`<h3>`).text(tweet.user.handle))
    tweetPost.append($(`<p>`).text(tweet.content.text))
    tweetPost.append($(`<footer>`).text(convertMS(Date.now() - tweet.created_at)))
    return tweetPost;
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
        renderTweets(tweetData);
      });
  }

  const $button = $(`#load-tweets`);
  $button.on(`submit`, function (event) {
    event.preventDefault();
    const error = $(`.char`).val();
    if (error === ``) {
      $(`.error`).slideDown();
      $(`.error`).text(`Invalid tweet`);
    } else if (error.length > 140) {
      $(`.error`).slideDown();
      $(`.error`).text(`Tweet too long`);
    } else {
      $(`.error`).slideUp();
      $.post(`/tweets`, $(this).serialize())
      $(this).trigger(`reset`);
      getTweets()
      getTweets();
    }
  });

  const $button1 = $(`#nav-bar input`);
  $button1.on(`click`, function () {
    let $newTweet = $(`.new-tweet`);
    if ($newTweet.css(`display`) === `none`) {
      $newTweet.slideDown();
      $(this).removeClass(`not-clicked`).addClass(`clicked`)
    } else {
      $newTweet.slideUp();
      $(this).removeClass(`clicked`).addClass(`not-clicked`)
    }
    $newTweet.focus();
  })
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