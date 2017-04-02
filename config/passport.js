var FacebookStrategy = require('passport-facebook').Strategy;

var Client = require("../app/models/client");

module.exports = function(passport) {
  passport.serializeUser(function(user, next) {
      next(null, user.id);
  });
  // used to deserialize the user 
  passport.deserializeUser(function(id, next) {
      Client.findById(id, function(err, user) {
          next(err, user);
      });
  });
  //Facebook strategy to authenticate with facebook
  passport.use(new FacebookStrategy( {
      clientID: 271754079904118,
      clientSecret: '05c2cb6700326d75f9c54b8829340cfc',
      callbackURL: 'http://localhost:8080/client/login/facebook/cb',
      profileFields: ['id', 'name', 'emails']
    },
    function(token, refreshToken, profile, next) {
      Client.findOne({'facebook.id': profile.id},
      function(err, client) {
        if (err) {
          next(err);
        }
        //Client exists, hand it to the next callback
        if (client) {
          next(null, client);
        }
        else {
          //Create a new client with the provided info from facebook
          var newClient = new Client();
          newClient.facebook.id = profile.id
          newClient.facebook.token = token
          newClient.firstName = profile.name.givenName
          newClient.lastName = profile.name.familyName
          newClient.email = profile.emails[0].value
          newClient.save(function(err) {
              if (err) {
                console.log(err)
                next(err)
              }
              return next(null, newClient)
          })
        }
      })
    })
  )
}
