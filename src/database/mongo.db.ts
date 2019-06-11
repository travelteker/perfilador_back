import { connect } from "mongoose";
import { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_PORT, MONGO_DB } from  '../utils';
import EConncectMongoDB from "../exceptions/db.mongo/connect.db";



class MongoDB {

    private uri: string | undefined;
    private options: any;


    constructor() {
        this.getUri();
        this.getOptions();
    }


    private getUri(): void {
        this.uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}:${MONGO_PORT}/${MONGO_DB}`;
    }


    private getOptions(): void {
        this.options = {
            useNewUrlParser: true,
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectTries: 30
        }; 
    }

    public async doConnect(){
        try {
            if(typeof(this.uri) == 'string') {
                const result = await connect(this.uri, this.options);
                console.info(`Conectado a MONGODB en puerto ${MONGO_PORT} - DB: ${MONGO_DB}`);
                return result;
            }
            throw new EConncectMongoDB(12221);
            
        } catch(err) {
            console.info(`Fatal Error, no se puedo conectar con MONGODB: ${err}`);
            const errorDB = new EConncectMongoDB(12222);
            return errorDB;
        } 
    }

}

export default MongoDB;