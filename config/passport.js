const JwyStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../config/passport');
const config = require('../config/database');

module.exports = function (passport){

  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  // opts.issuer = 'accounts.examplesoft.com';
  // opts.audience = 'yoursite.net';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.getUserById(jwt_payload._id, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));



}
