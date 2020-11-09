const bodyParser = require("body-parser");
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;


const fitcon = require('./Config/Config')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const fitbitauthsuccRouter = require('./routes/fitbitauth/fitbitauthsuccess')
const fitbitauthfailRouter = require('./routes/fitbitauth/fitbitauthfail')


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

app.use(session({ secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth/fitbit/success', fitbitauthsuccRouter)
app.use('/auth/fitbit/failure', fitbitauthfailRouter)


passport.use(new FitbitStrategy({
      clientID: fitcon.fitbitconfig.FITBIT_CLIENT_ID,
      clientSecret: fitcon.fitbitconfig.FITBIT_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/fitbit/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile
      })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

//need to connect to a database for this to run
passport.deserializeUser(function(user, done) {
    done(null, user)
});

app.get('/auth/fitbit',
    passport.authenticate('fitbit', {
      scope: ['activity','heartrate','location','nutrition','profile','settings','sleep','social','weight'] }
    ));

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
