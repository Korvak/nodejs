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
    await authService.login(req, user);
    await authService.dispose();
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
    res.send(`created user ${user.username} with password : ${user.password}`);
});

module.exports = AuthRoute;