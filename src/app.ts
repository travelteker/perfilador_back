import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { PORT, NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_PORT, MONGO_DB, applyMiddleware } from  './utils';
import middleware from "./middlewares";
import EErrorServer from './exceptions/errorServer';
import { AuthMiddleware } from './middlewares/auth';
import EHttpException from './exceptions/http.exception';





/**
 * 
 */
class Application {

    public app: express.Application;
    

    constructor(private routes: any[]) {
        this.app = express();
        this.routes = routes;
        this.init();
    }


    /**
     * 
     */
    private init() {
        this.settings();
        this.middlewares();
        this.loadRoutes();
        this.errorMiddleware();
        this.start();
    }


    /**
     * 
     */
    private settings() {
        this.app.set('PORT', PORT);
        this.app.set('NODE_ENV', NODE_ENV);
    }


    /**
     * 
     */
    private middlewares() {

        applyMiddleware(middleware, this.app);

        if(NODE_ENV == "development") {
            morgan.token('ip', function getIp(req: express.Request) {
                let ip: any;
                if(req.headers['x-forwarded-for']) {
                    ip = req.headers['x-forwarded-for'];
                }
                else if(req.connection.remoteAddress) {
                    ip = req.connection.remoteAddress;
                }
                else {
                    ip = '-';
                }
                return ip;
            })
            morgan.token('content-type', function getContentType(req: express.Request) {
                return req.headers["content-type"] || '-';
            })
            let myFormat: string = ':date[clf]|:ip|:status|:method|:content-type|:url|:response-time ms|:http-version';
            let accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
            this.app.use(morgan(myFormat, {stream: accessLog}));
        }

    }


    /**
     * 
     */
    public loadRoutes() {
        for (const route of this.routes) {
            const { path, router } = route;
            if(path == '/' || path == '/auth') {
                this.app.use(path, router);
            } else {
                this.app.use(path, AuthMiddleware, router);
            }
        }
    }
    

    /**
     * 
     */
    private errorMiddleware() {
        //Las rutas no encontradas las trataremos como EErrorServer
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next(new EErrorServer(9876));
        });
        this.app.use((error: EHttpException, req: Request, res: Response, next: NextFunction) => {
            if(error) {
                const code = error.code || 9999;
                const description = error.description || 'Something went wrong';
                res.status(500).json({"code": code, "data": description});
            }
            
        });
    }



    /**
     * 
     */
    private start() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log(`Server running on port '${this.app.get("PORT")}' and environment '${this.app.get("NODE_ENV")}'`);
        });
    }

}


export default Application;
