
var Middlewares = {
    /*
    "app" : {
        "path" : "/account/game",
        "middleware" : "adaflw.js"
    }
    */
}



function mapMiddlewares(app, Routes) {
    //#region mapMiddleware explanation
    /** the Middlewares dictionary is built as follows :
     *  the key is the route path or app if it's to be bound to the app
     *  the value is an object with the following properties : path and middleware
     *  path is the path to which we bound the middleware when we bind it to the router or app
     *  middleware is the path of the module we need to require */
    //#endregion
    for (let bindTo in Middlewares) {
        try {
            let bindData = Middlewares[bindTo];
            let path = bindData.path;
            //we fetch the middleware
            let middleware = require(bindData.middleware);
            let route = bindTo.toLowerCase() == "app" ? app : Routes[bindTo];
            //we check if the route exists
            if (route == undefined) {throw Error(`could not find the following route to bind the middleware to : ${bindTo}. `);}
            //if it does we bind the middleware to it depending on wether it has a path or not
            path !== "" ?  route.use(path, middleware) : route.use(middleware);
            console.log(`bound the following middleware ${middleware} to ${bindTo} with path ${path}.`);
        }
        catch(error) {
            console.error(`an error occured while binding middleware to the following route : ${bindTo}. `, error.message);
        }
    }
}


module.exports = {
    "mapMiddlewares" : mapMiddlewares
}