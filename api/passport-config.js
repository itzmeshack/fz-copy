const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./user');


function initialize(passport) {
    // Define the function to get user by email
    const getUserByEmail = async (email) => {
        return User.findOne({ email }); // Find user by email
    };

    // Define the function to get user by ID
    const getUserById = async (id) => {
        return User.findById(id); // Find user by ID
    };

    // Authentication logic
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);

            if (user == null) {
                return done(null, false, { message: 'No user with that email' });
            }

            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            if (user) {
                done(null, user);
            } else {
                done(new Error('User not found'));
            }
        } catch (err) {
            done(err);
        }
    });
}


module.exports = initialize;