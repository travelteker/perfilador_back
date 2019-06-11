import { Router } from 'express';
import { IRouter } from '../interfaces';
import { _AuthenticationController } from '../controllers/authentication.controller';
import { UserValidatorMiddleware } from '../middlewares/userValidator';
import { GetTokenValidatorMiddleware } from '../middlewares/getTokenValidator';
import { ApiKeyValidatorMiddleware } from '../middlewares/apiKeyValidator';


class AuthenticationRouter implements IRouter {

    public path:string = '/auth';
    public optionsRouter: any = {strict: true};
    public router = Router();

    
    constructor() {
        this.initializeRoutes();
    }


    /**
     * 
     */
    private initializeRoutes() {
        this.router.post('/register', UserValidatorMiddleware, _AuthenticationController.registration);
        this.router.post('/gettoken', GetTokenValidatorMiddleware, _AuthenticationController.getToken);
        this.router.post('/apikey/add', ApiKeyValidatorMiddleware, _AuthenticationController.addApiKey);
    }



}

export const _AuthenticationRouter = new AuthenticationRouter();




