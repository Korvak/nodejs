//could use json file encrypt for safety etc..

var fs = require('fs');


class ConfigurationRegion {

    constructor(data) {
        this.data = data;
    }

    getConfiguration(key) {
        return data[key];
    }
}


class Configuration {

    static __CONFIG_FILE_PATH = "./config.json";
    static __ROUTES_FILE_PATH = "./routes.json";
    static __MIDDLEWARE_FILE_PATH = "./middlewares.json";

    static CREATE_SERVICE() {
        return new Configuration();
    }


    constructor() {
        //this fetches from 3 json files:
        //configs
        try {
            this.configs = require(Configuration.__CONFIG_FILE_PATH);
        }
        catch(error) {
            console.error(error.message);
        }
        try {
            this.middlewares = require(Configuration.__MIDDLEWARE_FILE_PATH);
        }
        catch(error) {
            console.error(error.message);
        }
        try {
            this.routes = require(Configuration.__ROUTES_FILE_PATH);
        }
        catch(error) {
            console.error(error.message);
        }
    }

    //#region routes

        hasRoutes() { return this.routes !== undefined && this.routes != {}; }

        getRoutes() { return this.routes; }

    //#endregion
    //#region middleware

        hasMiddlewares() { return this.middlewares !== undefined && this.middlewares != {}; }

        getMiddlewares() { return this.middlewares; }

    //#endregion
    //#region config

        hasRegion(name) {
            return this.configs[name] !== undefined && this.configs[name] != {};
        }

        getRegion(name) {
            return this.configs[name];
        }

        getConfiguration(key, region = undefined) {
            return region != undefined ? this.configs[region][key] : this.configs;
        }

    //#endregion

}




module.exports = Configuration.CREATE_SERVICE;