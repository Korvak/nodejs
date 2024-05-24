const express = require("express");

let alfa = undefined;

try {
    alfa = require("./aldwa.js");
}
catch(error) {
    console.error(error.message);
}


var Routes = {
    "/account" : require("./accountRoute.js"),
    "/alfa" : alfa
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
        if (Routes[route] == undefined) {continue;}
        console.log(`mapping ${route} : ${typeof Routes[route]}`);
        app.use(route, Routes[route]);
    }
}


module.exports = {
    "mapRoutes" : mapRoutes,
    "registerRoute" : registerRoute
}
