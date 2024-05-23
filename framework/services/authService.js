const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const session = require('express-session');

const accountRepository = require("../repositories/accountRepository.js");

class User {

    constructor({}) {

    }

    static ERRORS = {
        INVALID_MODEL : "model is formatted incorrectly",
    }

    static isValid(user) {
        return user.username && user.password; 
    }
}



class AuthService {

    static __SECRET = "A239247DAWJ23981VEMA23";
    static __TOKEN_EXPIRATION_TIME = "1h";

    constructor(accountRepo) {
        this.accountRepo = accountRepo;
    }

    //#region user managment
    async getUserById(id) {

    }
    
    async getUserbyUsername(username) {

    }

    async getAllUsers() {

    }

    async removeUser(user) {

    }

    async editUser(user) {

    }

    //#endregion

    //#region authentication and authorization

        async login(request, user) {
            if (!user.username || !user.password) {
                throw new Error(User.ERRORS.INVALID_MODEL);
            }
            //we get the user from the username
            let userData = await this.getUserbyUsername(user.username);
            //we check if the password match
            let isMatch = await bcrypt.compare(user.password, userData.password);
            if (isMatch) { this.__signUser(request, userData); }   
            else { throw new Error("password doesn't match"); }     
        }

        async register(request, user) {
            if (User.isValid(user) ) {
                //we hash the user password and attempt to create the user then we sign it in
                let hashedPsw = await bcrypt.hash(user.password, 10);
                user.password = hashedPsw; //we set the new password
                let createdUser = await this.accountRepo.addUser(user);
                //then we just sign it
                this.__signUser(request, createdUser);
            }
            else {
                throw new Error(User.ERRORS.INVALID_MODEL);
            }
        }

        verifyFromSession(request) {
            try {
                if( request.session.authorization) {
                    const token = request.session.authorization['accessToken'];
                    let decodedData = this.verify(token);
                    if (decodedData !== undefined) {
                        request.user = decodedData;
                        return true;
                    }
                    return false;
                }
            }
            catch(error) {
                console.error(error.message);
                return false;
            }
        }

        verify(token) {
            return new Promise( (resolve, reject) => {
                jwt.verify(token , AuthService.__SECRET, (err, user) => {
                    if (err) {
                        resolve(undefined);
                    }
                    else {
                        resolve(user);
                    }
                });
            });
        }

        __signUser(request, userData) {
            // Create a JWT token
            const token = jwt.sign(userData, AuthService.__SECRET, { expiresIn: AuthService.__TOKEN_EXPIRATION_TIME });
            //we register it in the session
            request.session.authorization = {
                token,
                username
            }
        }

    //#endregion
}

//this is a function to generate the service with all the required dependencies
function createAuthService() {
    const accountRepository = accountRepository();
    return new AuthService(accountRepository);
}

module.exports = createAuthService;