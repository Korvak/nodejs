const express = require("express");


var Routes = {
    "/account" : require("./accountRoute.js")
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
        console.log(`mapping ${route}`);
        app.use(route, Routes[route]);
    }
}


module.exports = {
    "mapRoutes" : mapRoutes,
    "registerRoute" : registerRoute
}
