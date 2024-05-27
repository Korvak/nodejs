const express = require("express");
//const bodyParser = require("body-parser");
/*
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const session = require('express-session');
*/
//contains all the configuration data etc...
const ConfigurationService = require("./config/configurationService.js");
const routeResolver = require("./routes/routeResolver.js");
const middlewareResolver = require("./middlewares/middlewareResolver.js");



const PORT = 4000;
const app = express();
//through the app it gets the env which is used only once
const Configuration = ConfigurationService(app);

//#register app default middlewares

    //app.use(bodyParser.json()); // support json encoded bodies
    //app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    //we use the express default ones
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    //we enable express sessions
    app.use(session(
        {secret: Configuration.getSecret("session_secret")},resave=true,saveUninitialized=true));

    app.use(express.json());


//#endregion


//we register the routes
routeResolver.mapRoutes(app);
//then we have to use the middleware resolver which requires the routeResolver routes
middlewareResolver.mapMiddlewares(app, routeResolver.Routes);

//then we listen for the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});