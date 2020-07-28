var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
var userService = require('./services/userService')
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_TOKEN;

// lets create our strategy for web token
var strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) =>{
    console.log('payload received', jwt_payload);
    // next(null,true)
    try {
      var user = await userService.get(jwt_payload._id)
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    } catch (error) {
      next(error,false)      
    }
  });
  // use the strategy
passport.use(strategy);