import MongoDB from "../database/mongo.db";
import RedisDB from "../database/redis.db";
import ETypeDB from "../exceptions/type.db.excpetion";



export class DataBaseFactory {
    
    public doConnection(optionsDB: any): MongoDB | RedisDB | ETypeDB {
        let db: MongoDB | RedisDB | ETypeDB;
        switch(optionsDB.type) {
            case 'mongodb':
                db = new MongoDB();
                break;
            case 'redisdb':
                db = new RedisDB();
                break;
            default:
                db = new ETypeDB(11222);
        }
        return db;
    }

}