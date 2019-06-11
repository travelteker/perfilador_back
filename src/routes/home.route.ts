import { Router } from "express";
import { IRouter } from "../interfaces";
import { _HomeController } from '../controllers/home.controller';

/**
 * 
 */
class HomeRouter implements IRouter {

    public path: string = '/';
    public optionsRouter: any = {strict: true};  // https://expressjs.com/en/api.html --> express.Router([options])
    public router = Router(this.optionsRouter);


    constructor() {
        this.initializeRoutes();
    }


    /**
     * 
     */
    private initializeRoutes() {
        this.router.get('/', _HomeController.home);
        this.router.get('/salir', _HomeController.salir);
        this.router.post('/gettoken', _HomeController.generateToken);
        this.router.get('/list', _HomeController.listUser);
    }

   
}

export const _HomeRouter = new HomeRouter();

