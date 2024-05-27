//could use json file encrypt for safety etc..;


class ConfigurationRegion {

    constructor(data) {
        this.data = data;
    }

    getConfiguration(key) {
        return data[key];
    }
}

//need to change configuration so it fetches config files based on env
//need to add secure encryption for configuration
//need to add a tool to securely add new secret keys
class Configuration {

    static __CONFIG_FILE_PATH = "./config.json";
    static __ROUTES_FILE_PATH = "./routes.json";
    static __MIDDLEWARE_FILE_PATH = "./middlewares.json";
    static __SECRETS_FILE_PATH = "./secrets.json";

    static ENV = undefined;

    static CREATE_SERVICE(app = undefined) {
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
            this.secrets = require(Configuration.__SECRETS_FILE_PATH);
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
    //#region config and secrets

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
    //#region secrets

        getSecret(key, region = undefined) {
            return region != undefined ? this.secrets[region][key] : this.secrets[key];
        }

        getSecretRegion(name) {
            return this.secrets[name];
        }

    //#endregion
}




module.exports = Configuration.CREATE_SERVICE;