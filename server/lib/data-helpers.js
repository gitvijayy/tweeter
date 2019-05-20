`use strict`;
const ObjectId = require(`mongodb`).ObjectId

module.exports = function makeDataHelpers(db) {

  return {

    saveTweet: function (newTweet, callback) {
      db.collection(`tweets`).insertOne(newTweet);
      callback(null, true);
    },

    likeTweets: function (id, count) {
      db.collection(`tweets`).update({ _id: ObjectId(id) }, { $set: { likes: count } })
    },

    getTweets: function (callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection(`tweets`).find().toArray((err, tweets) => {
        callback(null, tweets.sort(sortNewestFirst));
      });
    },

    getUsers: function (callback) {
      //const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection(`users`).find().toArray((err, users) => {
        callback(null, users);
      });
    },

    addUser: function (newUser, callback) {
       db.collection("users").findOne({ email: newUser.email }, (err, result) => {
        
        if (result === null) {
          
          db.collection(`users`).insertOne(newUser);
          callback(null, true);
        } else {


          callback(true, false);
        }

      })

    },

    checkUser: function (newUser, callback) {
      db.collection("users").findOne({ email: newUser.email, password: newUser.password }
        , (err, result) => {
          console.log(result)
          console.log(err)
          if (result === null) {
            
            //console.log("exists")
            callback(true, false);

          } else {

            //console.log("added")
            //db.collection(`users`).insertOne(newUser);
            callback(null, true);
          }

        })

    }

  };

}

//syntax for stretch works - todo
      //db.collection(`tweets`).update({_id:ObjectId(id) }, { $set: { `user.handle`: count}})