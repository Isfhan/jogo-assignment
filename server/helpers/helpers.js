const generateResponseObject = (message = '', success = true, data = {}) => {
    return {
        success,
        message,
        data
    }
};


module.exports = {
    generateResponseObject
}