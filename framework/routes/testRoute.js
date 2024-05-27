const express = require("express");

const TestRoute = express.Router();

TestRoute.get("/alfa", (req,res) => {
    res.send("hello this is alfa");
});

TestRoute.get("/", (req,res) => {
    res.send("hello this is a test");
});

TestRoute.post("/", (req,res) => {
    res.send("hello this is a post test");
});


module.exports = TestRoute;