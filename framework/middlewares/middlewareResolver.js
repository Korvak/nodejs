
var Middlewares = {
    /*
    "app" : {
        "path" : "/account/game",
        "middleware" : "adaflw.js"
    }
    */
}

//contains all the configuration data etc...
const ConfigurationService = require("../config/configurationService.js");
//we create the configuration service
const Configuration = ConfigurationService();

if (Configuration.hasMiddlewares() ) {
    Middlewares = Configuration.getMiddlewares();
}



function mapMiddlewares(app, Routes) {
    //#region mapMiddleware explanation
    /** the Middlewares dictionary is built as follows :
     *  the key is the route path or app if it's to be bound to the app
     *  the value is an object with the following properties : path and middleware
     *  path is the path to which we bound the middleware when we bind it to the router or app
     *  middleware is the path of the module we need to require */
    //#endregion
    for (let route in Middlewares) {
        try {
            //we fetch the middleware
            let middleware = require(Middlewares[route]);
            //we check if the route exists
            if (route == undefined) {throw Error(`could not find the following route to bind the middleware to : ${route}. `);}
            //we bind the middleware to the path
            app.use(route , middleware);
            console.log(`bound the following middleware: ${middleware} to ${route}`);
        }
        catch(error) {
            console.error(`an error occured while binding middleware to the following route : ${route}`, error.message);
        }
    }
}


module.exports = {
    "mapMiddlewares" : mapMiddlewares
}