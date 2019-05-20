`use strict`;

require('dotenv').config();
const PORT = 8080;
const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const MongoClient = require(`mongodb`).MongoClient;
const MONGODB_URI = "mongodb://heroku_1z3jsnrc:fka36mot8qft09pjd9gppd0j2r@ds151076.mlab.com:51076/heroku_1z3jsnrc";
//mongodb://heroku_1z3jsnrc:fka36mot8qft09pjd9gppd0j2r@ds151076.mlab.com:51076/heroku_1z3jsnrc

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));

//connecting to database
MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  
  // The `data-helpers` module provides an interface to the database of tweets.
  const DataHelpers = require(`./lib/data-helpers.js`)(db);

  // defines routes that can beto interact with the data layer.
  const tweetsRoutes = require(`./routes/tweets`)(DataHelpers);
 
  app.use(`/tweets`, tweetsRoutes);
  
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ` + PORT);
});