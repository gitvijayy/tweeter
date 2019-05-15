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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  },

{"user":{"name":"Marcus Pacciani","handle":"@MrPacciani",
"avatars":{"small":"https://vanillicon.com/99465792e4540625e0e02c6f274dfa6c_50.png",
"regular":"https://vanillicon.com/99465792e4540625e0e02c6f274dfa6c.png",
"large":"https://vanillicon.com/99465792e4540625e0e02c6f274dfa6c_200.png"}},
"content":{"text":"sfsfsfsfsf"},"created_at":1557908223499}


];




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


  // return {
  //     year: year,
  //     day: day,
  //     hrs: hour,
  //     minute: minute,
  //     seconds: seconds
  // };
}

$(document).ready(() => {

  //jQuery("time.timeago").timeago();

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
  
    tweets.forEach((tweetData) => {
      let $tweet = createTweetElement(tweetData);
      $('.tweets-container').append($tweet);
    });
  
  };
  renderTweets(data);

});