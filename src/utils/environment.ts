import dotenv from 'dotenv';
import { IOptionsEnv }  from '../interfaces';
import { cleanEnv, str, port } from 'envalid';


let options: IOptionsEnv;
// Obtener las variables de configuración en función del ENTORNO DE APLICACIÓN
switch (process.env.NODE_ENV) {
    case "development":
        options = {
            encoding: "utf8",
            path: __dirname + "/../config/env/develop.env"
        }
        break;
    case "production":
        options = {
            encoding: "utf8",
            path:__dirname + "/../config/env/production.env"
        }
        break;
    default:
        options = {
            encoding: "utf8",
            path: __dirname + "/../config/env/develop.env"
        }
}


let envData = dotenv.config(options).parsed;

//Checking variables de entorno, en caso de fallo, abortamos con error y no arrancará el SERVER
if(envData && envData !== undefined) {
    cleanEnv(envData, {
        PORT: port(),
        NODE_ENV: str(),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_PORT: port(),
        MONGO_DB: str()
    });
}

let puerto: string = "3000";
let environment: string = "development";
let mongoUser: string = "";
let mongoPassword: string = "";
let mongoPath: string = "";
let mongoPort: string = "";
let mongoDB: string = "";
let jwt_secret: string = "";
let crypto_secret: string = "";


if(envData && envData.PORT !== undefined){
    puerto = envData.PORT;
}
if(envData && envData.NODE_ENV !== undefined){
    environment = envData.NODE_ENV;
}
if(envData && envData.MONGO_USER !== undefined) {
    mongoUser = envData.MONGO_USER;
}
if(envData && envData.MONGO_PASSWORD !== undefined) {
    mongoPassword = envData.MONGO_PASSWORD;
}
if(envData && envData.MONGO_PATH !== undefined) {
    mongoPath = envData.MONGO_PATH;
}
if(envData && envData.MONGO_PORT !== undefined) {
    mongoPort = envData.MONGO_PORT;
}
if(envData && envData.MONGO_DB !== undefined) {
    mongoDB = envData.MONGO_DB;
}
if(envData && envData.JWT_SECRET !== undefined) {
    jwt_secret = envData.JWT_SECRET;
}
if(envData && envData.CRYPTO_SECRET !== undefined) {
    crypto_secret = envData.CRYPTO_SECRET;
}



export const PORT = puerto;
export const NODE_ENV = environment;
export const MONGO_USER = mongoUser;
export const MONGO_PASSWORD = mongoPassword;
export const MONGO_PATH = mongoPath;
export const MONGO_PORT = mongoPort;
export const MONGO_DB = mongoDB;
export const JWT_SECRET = jwt_secret;
export const CRYPTO_SECRET = crypto_secret;

