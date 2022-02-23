// Import required packages 
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

// Importing user model
const User = require('../models/User');

// Importing custom error handler 
const errorHandler = require('../helpers/errorHandler');

// Importing custom email validator 
const validateEmail = require('../helpers/validateEmail');

// Importing custom Response Object generator 
const { generateResponseObject } = require('../helpers/helpers');

// Signup function 
const signup = async (req, res) => {

    // Get user input   
    const { name, email, password } = req.body;

    try {
        // Check that nothing is empty or undefine 
        if (!name || !email || !password) throw new Error('Please add all fields');

        // Changing email to lowercase
        const modifiedEmail = String(email).toLowerCase();

        // Check email is validate in format
        if (!validateEmail(modifiedEmail)) throw new Error('Invalid email');

        // Check if user exists
        const userExists = await User.findOne({ email: modifiedEmail });
        if (userExists) throw new Error('User already exists');

        // Hashing password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = new User({
            name: name,
            email: email,
            password: passwordHash,
        });
        // Save data in DB
        await newUser.save();

        // Creating Token
        const token = jwt.sign({ id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set response status
        res.status(201);

        // Creating data for response
        const data = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: token
        };

        // Sending response to client
        res.send(generateResponseObject('User created successfully',true, data));

    } catch (error) {
        // if error invoke error handler 
        errorHandler(res, error);
    }
};

const login = async (req, res) => {

    // Get user input   
    const { email, password } = req.body;

    try {
        // Check that nothing is empty or undefine 
        if (!email || !password) throw new Error('Email or Password is missing');

        // Changing email to lowercase
        const modifiedEmail = String(email).toLowerCase();

        // Check email is validate in format
        if (!validateEmail(modifiedEmail)) throw new Error('Invalid email');

        // Check if user exists
        const user = await User.findOne({ email: modifiedEmail });
        if (!user) throw new Error('User not exist');
 
        // Comparing user password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Password is not valid');

        // Set response status
        res.status(200);

        // Creating Token
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Creating data for response
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        };

        // Sending response to client
        res.send(generateResponseObject('User login successfully',true, data));

    } catch (error) {
        // if error invoke error handler 
        errorHandler(res, error);
    }

};


// Exporting controller function 
module.exports = {
    signup,
    login
}


