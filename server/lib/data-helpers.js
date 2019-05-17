"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");
// const MongoClient = require("mongodb").MongoClient;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      // simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet);
        //db.push(newTweet);
        callback(null, true);
      // });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      // simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection("tweets").find().toArray((err, tweets) => {
        callback(null, tweets.sort(sortNewestFirst));
      // })
      });
    }

  };
}


// MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }

//   console.log(`Connected to mongodb: ${MONGODB_URI}`);

//   function getTweets(callback) {
//     db.collection("tweets").find().toArray((err, tweets) => {
//       if (err) {
//         return callback(err);
//       }

//       callback(null, tweets);
//     });
//   }

//   getTweets((err, tweets) => {
//     if (err) throw err;
//     console.log(tweets);
//     // console.log("Logging each tweet:");
//     // for (let tweet of tweets) {
//     //   console.log(tweet);
//     // }
    
//     const DataHelpers = require("./lib/data-helpers.js")(tweets);
//     const tweetsRoutes = require("./routes/tweets")(DataHelpers);
//     app.use("/tweets", tweetsRoutes);
//     db.close();
//   });

// });