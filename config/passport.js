var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../app/models");
var bCrypt = require('bcrypt');
// const uuid = require('uuid/v4');
// var GoogleStrategy = require('passport-google-oauth2').OAuth2Strategy;

module.exports = function () {
  passport.use('local-signup',
    new LocalStrategy({ usernameField: "username", passwordField: "password", passReqToCallback: true },
      function (req, username, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        };
        db.Users.findOne({
          where: { username: username }
        }).then(function (user) {
          if (user) {
            return done(null, false, { message: "User already exists" });
          } else {
            var hashpassword = generateHash(password);
            // var hashanswer = generateHash(req.body.securityAnswer);
            var data = {
              username: username,
              fullname: req.body.fullname,
              email: req.body.email,
              password: hashpassword,
              active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            db.Users.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false, { message: "Unable to create new User on this employeeID" });
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, username, password, done) {
      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }
      db.Users.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (!user) {
          return done(null, false, {
            message: 'User does not exist'
          });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        var userinfo = user.get();
        console.log('user info :', userinfo);
        return done(null, user);
      }).catch(function (err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    if (user) {
      return done(null, { id: user.id, username: user.username, fullname: user.fullname, email: user.email });
    }
  });

  passport.deserializeUser(function (user, done) {
    console.log('deserializeUser:', user);
    db.Users.findOne({ where: { username: user.username } }).then(project => {
      if (err) {
        console.log("Error loading user: " + err);
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
};