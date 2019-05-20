`use strict`;

const userHelper = require(`../lib/util/user-helper`)

const express = require(`express`);
const tweetsRoutes = express.Router();




module.exports = function (DataHelpers) {

  tweetsRoutes.get(`/`, function (req, res) {
    DataHelpers.getTweets((err, tweets) => {

      if (err) {
        res.status(500).json({ error: err.message });
      } else {       
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post(`/:id/:count`, function (req, res) {
    DataHelpers.likeTweets(req.params.id, req.params.count)
  });

  tweetsRoutes.post(`/`, function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: `invalid request: no data in POST body` });
      return;
    }
    console.log(req.body)

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser(req.body.username);
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post(`/register`, function (req, res) {
    const user = {
      username: req.body.username,
      password: req.body.password,


    }
    DataHelpers.addUser(user, (err) => {
      if (err) {
        res.status(409).send()
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post(`/login`, function (req, res) {
    const user = {
      username: req.body.username,
      password: req.body.password,


    }
    
    DataHelpers.checkUser(user, (err) => {
      if (err) {
        res.status(409).send()
      } else {
        
        res.status(201).send();
      }
    });
    
  });

  return tweetsRoutes;

}

//req.session.user_id ? res.redirect(`/urls`) : res.redirect(`/login`)