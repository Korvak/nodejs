const express = require("express");
const authService = require("../services/authService.js");

const AuthRoute = express.Router();


//we accept data from url-encoded so we have to use the appropriate middleware
AuthRoute.post("/login", async (req,res) => {
    let user = {
        username : req.body.username,
        password : req.body.password
    }
    await authService.login(req, user);
});


//we accept data from url-encoded so we have to use the appropriate middleware
AuthRoute.post("/register", async (req,res) => {
    let user = {
        username : req.body.username,
        email : req.body.email,
        name : req.body.name,
        surname : req.body.surname,
        password : req.body.password,
    }
    await authService.register(req, user);
});

module.exports = AuthRoute;