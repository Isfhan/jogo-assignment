// Importing custom Response Object generator 
const { generateResponseObject } = require('./helpers');
// Creating errorHandler function
const errorHandler = (response, error) => {
    switch (error.message) {
        case 'internal server error':
            generateErrorResponse(error, 500, response);
            break;
        case 'Email or Password is missing':
            generateErrorResponse(error, 400, response);
            break;
        case 'Invalid email':
            generateErrorResponse(error, 400, response);
            break;
        case 'User already exists':
            generateErrorResponse(error, 400, response);
            break;
        case 'User not exist':
            generateErrorResponse(error, 404, response);
            break;
        case 'Password is not valid':
            generateErrorResponse(error, 401, response);
            break;
        case 'invalid token':
            generateErrorResponse(error, 401, response);
            break;
        case 'Please add all fields':
            generateErrorResponse(error, 400, response);
            break;
        default:
            generateErrorResponse(error, 500, response);
    }
};

// This function send response
const generateErrorResponse = (error, status, res) => {
    // Set response status code
    res.status(status);
    // Set response status
    res.send(generateResponseObject(error.message,false));
};

// Exporting errorHandler
module.exports = errorHandler;