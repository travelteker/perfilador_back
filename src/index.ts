
import { DataBaseFactory } from './core/dataBaseFactory';

import App from './app';
import routes from "./routes";
import { MONGO_DB } from './utils';
import RedisDB from './database/redis.db';
import ETypeDB from './exceptions/type.db.excpetion';

/*
const db = new MongoDB();
const linkMongo = db.doConnect();
linkMongo.then((res) => {
    if(res.name == 'MongoNetworkError') {
        // Si obtenemos error de conexión abortamos arranque del servidor
        process.exit(1);
    }
    // Se establecio la conexión con MongoDB de satisfactoriamente
    const server: App = new App(routes);
});

linkMongo.catch((error) => {
    // Falló la conexión con MongoDB
    console.log('Error sistema, no se pudo inicializar el servidor NODEJS');
});
*/
//export default server



const FactoryDB = new DataBaseFactory();
const dbMongo = FactoryDB.doConnection({type: 'mongodb'});
if(dbMongo instanceof ETypeDB) {
    console.info(`code:${dbMongo.code}|message:${dbMongo.message}`);
    process.exit(1);
} else { 
    const linkMongo = dbMongo.doConnect();
    linkMongo.then((res) => {
        // code indicador de respuest valida code = 1 o respuesta fallida code > 1 ocurrio un error
        if(res.code && res.code > 1) {
            console.info(`code:${res.code}|message:${res.message}`);
            // Si obtenemos error de conexión abortamos arranque del servidor
            process.exit(1);
        }
        // Se establecio la conexión con MongoDB de satisfactoriamente
        const server: App = new App(routes);
    });
    
    linkMongo.catch((error) => {
        console.info(`code:${error.code}|message:${error.message}`);
        process.exit(1);
    });
}





//const dbRedis = FactoryDB.doConnection({uri: 'URI_REDISDB', options: 'OPTIONS_REDISDB', type: 'redisdb'})
//dbRedis.doConnect();


/*
// Promesas en paralelo
Promise.all()
    .then( (res) => {
        [item1, item2] = res;
    });
*/
