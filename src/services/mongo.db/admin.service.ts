
import { Response, NextFunction } from 'express';
import CredentialsModel from '../../models/credential';
import EAdminDB from '../../exceptions/db.mongo/admin';
import EWrongRequest from '../../exceptions/wrongRequsest';
import { IApiKey } from '../../interfaces';


const APIKEY_EXISTS = 6001;
const ADD_APIKEY_FAILED = 6002;
const QUERY_ID_FAILED = 202200;

/**
 * Clase para gestionar los SERVICIOS contra la BD MONGO, relacionados con la colección USERS
 */
class Admin {

    
    constructor() {}
    

    /**
     * Añadir usuario a la BD siempre que no exista el email. Todos los emails deben ser únicos
     * @param user 
     * @param res 
     * @param next 
     * @return {RESPONSE}
     */
    static async registerApiKey(dataKey: IApiKey, res: Response, next: NextFunction): Promise<any> {
        let addApiKey = new CredentialsModel(dataKey);
        try {
            await addApiKey.save();
            res.json({"code": 1, "data": {"action": "ApiKey registered"}});
        } catch(err) {
            console.log(err);
            next(new EAdminDB(ADD_APIKEY_FAILED));
        }     
    }


    /**
     * Buscar en BD el APIKEY del Schema Credentials --> será el ID asignado por MONGO
     * @param apiKey 
     * @return {CREDENTIALS | ERROR}
     */
    static async findObjectIdCredentials(apikey: string): Promise<any> {
        try {
            const apiKeyExists = await CredentialsModel.findById(apikey); 
            //Si no encuentra la coincidencia entonces devuelve NULL, en caso contrario el JSON de los datos del user
            return apiKeyExists;
        } catch(error) {
            return new EAdminDB(QUERY_ID_FAILED);
        }
    }

}



export default Admin;