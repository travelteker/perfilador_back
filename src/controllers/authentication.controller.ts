import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces';
import UserService from '../services/mongo.db/user.service';
import AdminService from '../services/mongo.db/admin.service';




class AuthenticationController {
   

    constructor() {}


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public registration(req: Request, res: Response, next: NextFunction) {
        //Si llegamos aqui es que los datos tienen la estructura correcta porque pasaron por el middleware
        const userData: IUser = req.body;   
        UserService.addUser(userData, res, next);
    }


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public getToken(req: Request, res: Response, next: NextFunction) {

        UserService.generateToken(req, res, next);
    
    }


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public addApiKey(req: Request, res: Response, next: NextFunction) {

console.log(req.body.param);

        AdminService.registerApiKey(req.body, res, next);
    }

}

export const _AuthenticationController = new AuthenticationController();

