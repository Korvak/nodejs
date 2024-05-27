const express = require("express");
const authServiceProvider = require("../services/authService.js");

const AuthRoute = express.Router();


//we accept data from url-encoded so we have to use the appropriate middleware
AuthRoute.post("/login", async (req,res) => {
    let user = {
        username : req.body.username,
        password : req.body.password
    }
    let authService = authServiceProvider();
    let result = await authService.login(req, user);
    await authService.dispose();
    if (result) {
        return res.send(`logged in as ${user.username}.`);
    }
    else {
        return res.status(403).json({message: "username or password do not match."});
    }
    
});


//we accept data from url-encoded so we have to use the appropriate middleware
AuthRoute.post("/register", async (req,res) => {
    let user = {
        username : req.body.username,
        email : req.body.email,
        name : req.body.name,
        surname : req.body.surname,
        password : req.body.password,
    };
    let authService = authServiceProvider();
    user = await authService.register(req, user);
    await authService.dispose();
    res.send(`created user : ${user.username}.`);
});

AuthRoute.post("/logout", async (req,res) => {
    let authService = authServiceProvider();
    await authService.logout(req);
    res.send("logged out");
});

module.exports = AuthRoute;