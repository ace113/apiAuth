const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { JWT_SECRET } = require('../config')

signToken = user => {
    return jwt.sign({
        iss: 'Codeworker', // optional
        sub: user.id, // can also be written as user._id
        iat: new Date().getTime(),// optional(issued at)
        exp: new Date().setDate(new Date().getDate()+1) // Current time + 1 day added
    }, 'JWT_SECRET')

}

module.exports = {
    signUp: async (req, res, next) => {        
        // console.log('UsersController.signUp() called')

        const { email, password } = req.value.body;
        // This is equivalent to code below
        // const email = req.value.body.email;
        // const password = req.value.body.password;

        // Check if there is a user with the same email
        const foundUser = await User.findOne({ email })
        if(foundUser) { 
            return res.status(403)
            .json({ error: 'Email is already taken'}
            )}

        // Create new user
        const newUser = new User({
            email,
            password
        })
        await newUser.save();

        // Respond with token
        // res.json({ user:'created' })
        
        // Generate the token
        const token = signToken(newUser);
       
        // Respond with token 
        res.status(200).json({ token })
    },

    signIn: async (req, res, next) => {
        // console.log('UsersController.signIn() called')
    },

    secret: async (req, res, next) => {
        console.log('UsersController.secret() called')
    }
    
}