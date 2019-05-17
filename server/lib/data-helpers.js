"use strict";
const ObjectId = require("mongodb").ObjectId
module.exports = function makeDataHelpers(db) {
  //console.log(4);
  //console.log(db)
  return {

    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

  likeTweets: function (id,count) {
    db.collection("tweets").update({_id:ObjectId(id) }, { $set: { likes: count}})
    //syntax for stretch works - todo
    //db.collection("tweets").update({_id:ObjectId(id) }, { $set: { "user.handle": count}})
  },

    getTweets: function (callback) {
      console.log("data helpers")
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().toArray((err, tweets) => {
        callback(null, tweets.sort(sortNewestFirst));
        // })
      });

    }
  };
}
