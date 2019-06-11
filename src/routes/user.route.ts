import { Router, Request, Response } from 'express';
import { IRouter } from '../interfaces';
import { _UserController } from '../controllers/user.controller';



class UserRouter implements IRouter {

    public path:string = '/user';
    public optionsRouter: any = {strict: true};
    public router = Router();


    constructor() {
        this.initializeRoutes();
    }

    
    /**
     * 
     */
    private initializeRoutes() {
        this.router.get('/', _UserController.createUser);
        //this.router.post(`${this.path}/login`, validationMiddleware(LogIn), this.logginIn);
    }


}

export const _UserRouter = new UserRouter();

