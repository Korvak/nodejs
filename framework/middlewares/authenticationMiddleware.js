

function authenticate(req, res, next) {
    if (req.session.authorization) {
        token = req.session.authorization['accessToken'];
        
    }
}



module.exports = authenticate;