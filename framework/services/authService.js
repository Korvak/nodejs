const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const accountRepository = require("../repositories/accountRepository.js");
const ConfigurationService = require("../config/configurationService.js");


class User {

    constructor({}) {

    }

    static ERRORS = {
        INVALID_MODEL : "model is formatted incorrectly",
    }

    static isValid(user) {
        return user.username && user.password; 
    }
    
    static copy(user) {
        let data = {};
        data.username = user.username;
        data.password = user.password;
        data.email = user.email;
        data.name = user.name;
        data.surname = user.surname;
        return data;
    }
}



class AuthService {

    static CREATE_SERVICE() {
        //this is a function to generate the service with all the required dependencies
        return new AuthService( ConfigurationService(), accountRepository() );
    }

    constructor(configuration , accountRepo) {
        this.__accountRepo = accountRepo;
        this.__configuration = configuration;
    }

    //#region user managment
    async getUserById(id) {

    }
    
    async getUserbyUsername(username) {
        if (!username) {return undefined;}
        try {
            return await this.__accountRepo.getUserbyUsername(username);
        }
        catch(error) {
            console.error(error.message);
            return undefined;
        }
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
            if (isMatch) { return this.__signUser(request, userData); }   
            else {
                return undefined;
                //throw new Error("username or password do not match."); 
            }
        }

        async register(request, user, signIn = true) {
            if (!User.isValid(user) ) {throw new Error(User.ERRORS.INVALID_MODEL);}
            //we hash the user password and attempt to create the user then we sign it in
            let hashedPsw = await bcrypt.hash(user.password, this.__configuration.getSecret("salt_steps", "auth") );
            user.password = hashedPsw; //we set the new password
            let createdUser = await this.__accountRepo.addUser(user);
            console.warn("created", createdUser);
            if (signIn) {await this.__signUser(request, createdUser); }
            console.log("register session data", request.session);
            return createdUser;
        }

        async logout(request) {
            //in this case it justs logs out of the session
            request.session.destroy();
        }

        async verifyFromSession(request) {
            try {
                console.log("current session data", request.session);
                if( request.session.authorization) {
                    //we fetch the token from the session which we set in the login
                    const token = request.session.authorization['accessToken'];
                    console.warn("token", token);
                    let decodedData = await this.verify(token);
                    console.warn("decoded", decodedData);
                    //we set the request user if not undefined
                    if (decodedData !== undefined) {
                        request.user = decodedData;
                        return true;
                    }
                    return false;
                }
                console.warn(" no request session authorization available.");
                return false;
            }
            catch(error) {
                console.error(error.message);
                return false;
            }
        }

        verify(token) {
            return new Promise( (resolve, reject) => {
                try {
                    jwt.verify(
                        token , this.__configuration.getSecret("secret", "auth"),
                        (err, user) => {
                            if (err) {
                                resolve(undefined);
                            }
                            else {
                                resolve(user);
                            }
                        }
                    );
                }
                catch(error) {reject(error);}
            });
        }

        async __signUser(request, userData) {
            // Create a JWT token
            console.log("signing", userData);
            let username = userData.username;
            const token = jwt.sign(
                userData,
                this.__configuration.getSecret("secret", "auth"),
                 { expiresIn: this.__configuration.getSecret("token_expiration_time", "auth") });
            //we register it in the session
            request.session.authorization = {
                "accessToken" : token,
                "username" : username
            };
            //we return the token we just created
            return token;
        }

    //#endregion

    async dispose() {
        try {
            await this.__accountRepo.dispose();
            delete this.__accountRepo;
            delete this.__configuration;
            delete this;
            return true;
        }
        catch(error) {
            console.error(error.message);
            return false;
        }
    }
}



module.exports = AuthService.CREATE_SERVICE;