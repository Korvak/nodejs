const express = require("express");


var Routes = {
    "/account" : "./accountRoute.js",
    "/alfa" : "./aldwa.js"
}

function registerRoute(routeName, route) {
    if (typeof route != typeof route) {
        //we throw an error
        console.error(`trying to register ${routeName} with an invalid route object.`);
    }
    else {
        Routes[routeName] = route;
    }
}

function mapRoutes(app) {
    for(let route in Routes) { //route is the route name while the value is the express Router
        try {
            let router = require( Routes[route] );
            console.log(`mapping ${route} : ${typeof router}`);
            app.use(route, router);
        }  
        catch(error) {
            console.error(`failed to map route ${route} :`,error.message);
        }
    }
}


module.exports = {
    "mapRoutes" : mapRoutes,
    "registerRoute" : registerRoute
}
