import jwt from 'jsonwebtoken';
import Cryptr from 'cryptr';
import UserModel from '../../models/user';
import AuthApiModel from '../../models/credential';
import { IUser, IDataStoredInToken } from '../../interfaces';
import { Request, Response, NextFunction } from 'express';
import EUserDB from '../../exceptions/db.mongo/user';
import { JWT_SECRET } from '../../utils';
import EWrongRequest from '../../exceptions/wrongRequsest';
import { CRYPTO_SECRET } from '../../utils/environment';

const ADD_USER_FAILED: number = 5101;
const USER_FIND_FAILED: number = 5102;
const USER_EXISTS: number = 5103;
const APIKEY_FAILED: number = 5104;
const APIKEY_NOT_EXIST: number = 5105;
const OPERATION_GETTOKEN_FAILED: number = 5106;
const DURACION: string = '1h';


/**
 * Clase para gestionar los SERVICIOS contra la BD MONGO, relacionados con la colección USERS
 */
class User {

    
    constructor() {}
    

    /**
     * Añadir usuario a la BD siempre que no exista el email. Todos los emails deben ser únicos
     * @param user 
     * @param res 
     * @param next 
     * @return {RESPONSE}
     */
    static async addUser(user: IUser, res: Response, next: NextFunction): Promise<any> {

            let searchUser: any;
            if(searchUser = await User.findByEmail(user.email)) {
                if(searchUser instanceof EUserDB) {
                    next(searchUser);
                }
                else {
                    next(new EUserDB(USER_EXISTS));
                }
            }
            else {
                let newUser = new UserModel(user);
                try {
                    await newUser.save();
                    res.json({"code": 1, "data": {"action": "register user"}});
                } catch(err) {
                    next(new EUserDB(ADD_USER_FAILED));
                }
            }
    }


    /**
     * Buscar en BD un solo usuario que contenga el email facilitado
     * @param user 
     * @return {USER | ERROR}
     */
    static async findByEmail(emailEncriptado: string): Promise<any> {

        try {
            let emailUser = User.decryptData(emailEncriptado);
            const userExists = await UserModel.findOne({email: emailUser}); 
            //Si no encuentra la coincidencia entonces devuelve NULL, en caso contrario el JSON de los datos del user
            return userExists;
        } catch(error) {
            return new EUserDB(USER_FIND_FAILED);
        }
    }


    /**
     * 
     * @param xapikey 
     */
    static async findByApiKey(xapikey: string): Promise<any> {
        try {
            const checkApiKey = await AuthApiModel.findOne({apiKey: xapikey}); 
            //Si no encuentra la coincidencia entonces devuelve NULL, en caso contrario el JSON de los datos del user
            return checkApiKey;
        } catch(error) {
            return new EWrongRequest(APIKEY_FAILED);
        }
    }


    /**
     * 
     * @param user 
     * @param res 
     * @param next 
     */
    static generateToken(req: Request, res: Response, next: NextFunction) {

console.log(`xapikey: ${res.locals.xapikey}`);
        
        const validToken = User.findByApiKey(res.locals.xapikey);

        Promise.all([validToken])
        .then( (values) => {
            const token = values[0];
            if(!token){
                next(new EWrongRequest(APIKEY_NOT_EXIST));
            } else {
                let data: any = {
                    apikey: res.locals.xapikey
                }
                res.status(200).json({code:1, data: {token: jwt.sign(data, JWT_SECRET, {expiresIn: DURACION})}});
            }
        })
        .catch( (error) => {
            next(new EWrongRequest(OPERATION_GETTOKEN_FAILED)); 
        });
    }


    /**
     * Encriptar un string
     * @param data 
     * @return {string}
     */
    private static encryptData(data: string): string {
        const cryptr = new Cryptr(CRYPTO_SECRET);
        return cryptr.encrypt(data);
    }


    /**
     * Descemcriptar el string
     * @param data 
     * @return {string}
     */
    private static decryptData(data: string): string {
        const cryptr = new Cryptr(CRYPTO_SECRET);
        return cryptr.decrypt(data);
    }


}



export default User;