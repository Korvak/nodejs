const authServiceProvider = require("../services/authService.js");

async function auth(req, res, next) {
    const authService = authServiceProvider();
    if ( await authService.verifyFromSession(req) ) {
        await next();
    }
    else {
        return res.status(403).json({message: "User not logged in"});
    }
}



module.exports = auth;