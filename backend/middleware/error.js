const {constants} = require("../constants")
const error = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack})
        case constants.NOT_FOUND:
            res.json({title: "Not Found", message: err.message, stackTrace: err.stack})
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized", message: err.message, stackTrace: err.stack})
        case constants.FORBIDDEN:
            res.json({title: "Forbidden", message: err.message, stackTrace: err.stack})
        case constants.SERVER:
            res.json({title: "Server Error", message: err.message, stackTrace: err.stack})
        default:
            console.log("No Error, all good!")
            
    }
    
    

}

module.exports = error;