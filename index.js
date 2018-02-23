const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // not express-session.
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// require('./services/passport');
require('./models/User');
require('./services/passport'); // passport uses models.

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// how long the cookie will last: eg. 30 days in millisec.
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

// route handler
// app.get('/', (req, res) => {
//   res.send({Hi: 'there, deployed again!'}); // JSON
// });

// console.developers.google.com

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
// returns a func.

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
// app.listen(5000); // telling node to listen.
app.listen(PORT);
// localhost:5000
