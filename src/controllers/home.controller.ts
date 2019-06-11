import { Request, Response, NextFunction } from "express";
import UserModel from '../models/user';
import EWrongAuthenticationToken from '../exceptions/wrongAuthenticationToken'

/**
 * 
 */
class HomeController {


    constructor() {}


    /**
     * 
     * @param req 
     * @param res 
     */
    public home(req: Request, res: Response ) {
        res.json({"saludar":"Hola visitante!"});
    }


    /**
     * 
     * @param req 
     * @param res 
     */
    public salir(req: Request, res: Response) {
        res.json({"salid": "Espero verte pronto!"});
    }


    /**
     * 
     */
    public async generateToken(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        
        //TODO llamar al servicio que genera el TOKEN ---> el CONTROLLER gestiona SOLO no hace calculos 

        try{
            const salida = await UserModel.findOne({"email": email});
            if(salida && salida._id) {
                //TODO GENERAR JWT con la estructura de datos y tiempo de vida predefinido
                res.json({"code": 1, "data": {"token": "valor del token"}});
            }
            else {
                res.json({"code": 1111, "data": {"description": "mensaje error"}});
            }
        } catch (error) {
            next(new EWrongAuthenticationToken(0));
        }
    }


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async listUser(req: Request, res: Response, next: NextFunction) {
        try {
            await UserModel.find();
            res.json({"usuarios": "sistema"});
        } catch (error) {
            next(new EWrongAuthenticationToken(0));
        }
        
    }
}

export const _HomeController = new HomeController();

