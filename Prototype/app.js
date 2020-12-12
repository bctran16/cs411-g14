const bodyParser = require("body-parser");
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const User = require('./models/user-model');
const config = require('./Config/Config');
const cookieSession = require('cookie-session');

//connect to mongodb
mongoose.connect(config.mongodb.dbURI, () => {
  console.log("Connected to db")
})

// Initialize all routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authrizedRoute = require('./routes/authorized')
const fitbitauthsuccRouter = require('./routes/fitbitauth/fitbitauthsuccess')
const fitbitauthfailRouter = require('./routes/fitbitauth/fitbitauthfail')
const googlefitauthsuccRouter = require('./routes/googlefitauth/googlefitsuccess')
const googlefirauthfailRouter = require('./routes/googlefitauth/googlefitfail')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  maxAge:60*60*1000, 
  keys: [config.session.cookieKey]
}));

app.use(session({ secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth/fitbit/success', fitbitauthsuccRouter)
app.use('/auth/fitbit/failure', fitbitauthfailRouter)
app.use('/auth/google/success', googlefitauthsuccRouter)
app.use('/auth/google/failure', googlefirauthfailRouter)
app.use('/authorized',authrizedRoute)

// initialize passport

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//need to connect to a database for this to run
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null,user)
  })
});

// Fitbit Oauth Initialization 
passport.use(new FitbitStrategy({
      clientID: config.fitbitconfig.FITBIT_CLIENT_ID,
      clientSecret: config.fitbitconfig.FITBIT_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/fitbit/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({fitbitid: profile.id}).then((currentUser) => {
        if (currentUser) {
          // user exist
          done(null,currentUser)
          console.log("User already existed" + currentUser)
        } else {
          // create new user
          new User({
            username: profile.displayName,
            googleid: profile.id
          }).save().then((newUser) => {
            console.log("User data stored in db")
            done(null, newUser)
          })
        }
      })
    }
));

//Calling Fitbit Oauth
app.get('/auth/fitbit',
    passport.authenticate('fitbit', {
      scope: ['activity','heartrate','location','nutrition','profile','settings','sleep','social','weight'] }
    ),);

// redirect route
app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', {
  successRedirect: '/auth/fitbit/success',
  failureRedirect: '/auth/fitbit/failure'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
