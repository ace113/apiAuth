const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config')
const User = require('./models/user')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done)=>{
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub)
        console.log(payload.sub)

        // If user doen't exists, handle it
        if(!user) {
            return done(null, false);
        }
        
        // Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }

}))