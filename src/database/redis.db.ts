import { connect } from "mongoose";
import { NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_PORT, MONGO_DB } from  '../utils';

/*
const uri: string = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}:${MONGO_PORT}/${MONGO_DB}`;

const options: any = {
    useNewUrlParser: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
}; 
*/

class RedisDB {

    private uri: string | undefined;
    private options: any;

    constructor() {
       this.getUri();
       this.getOptions();
    }


    private getUri() {

    }


    private getOptions() {

    }


    public async doConnect() {
        try {
            if(typeof(this.uri) == 'string') {
                const result = await connect(this.uri, this.options);
                console.log(`Conectado a MONGODB en puerto ${MONGO_PORT} - DB: ${MONGO_DB}`);
                return result;
            }
            throw new Error('URI no válida para conectar con REDIS');
        } catch(err) {
            console.log(`Fatal Error, no se puedo conectar con MONGODB: ${err}`);
            return err;
        } 
    }

}

export default RedisDB;