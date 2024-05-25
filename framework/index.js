const express = require("express");
const bodyParser = require("body-parser");
/*
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const session = require('express-session');
*/

const routeResolver = require("./routes/routeResolver.js");
const middlewareResolver = require("./middlewares/middlewareResolver.js");


const PORT = 4000;
const app = express();

//#register app default middlewares

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//#endregion

app.get("/", (req,res) => {
    res.send("hello");
});

//we register the routes
routeResolver.mapRoutes(app);
//then we have to use the middleware resolver which requires the routeResolver routes
middlewareResolver.mapMiddlewares(app, routeResolver.Routes);

//then we listen for the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});