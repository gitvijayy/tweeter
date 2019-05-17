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

  //to calculate the date in days years etc.. source:StackOverFlow
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

    $.ajax({
      type: 'GET',
      url: `/tweets`,
      success: (tweetData) => {
        $(`.error`).slideUp();
        renderTweets(tweetData);
      },
      error: () => {
        $(`.error`).slideDown();
        $(`.error`).text(`404: Try Again!`)
      }

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

  //renders all the tweets on page load or refresh
  getTweets();

});

