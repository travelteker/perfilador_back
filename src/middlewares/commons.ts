import { Router, Request, Response, NextFunction, json, urlencoded } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import EWrongRequest from "../exceptions/wrongRequsest";


//Forzar cabeceras por defecto para todas las peticiones
let checkHeaders = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers['content-type']) {
        next(new EWrongRequest(101101));
    } else if(req.headers['content-type'] != 'application/json') {
        next(new EWrongRequest(101102));
    } else {
        next();
    }

    
}

export const handleHeadersType = (router: Router) => {
    router.use(checkHeaders);
}



let checkCompression = (req: Request, res: Response) => {
    if(req.headers['x-no-compression']) {
        //Las peticiones con estas cabeceras no harán compresión de las respuestas
        return false;
    }

    return compression.filter(req, res);
}

export const handleCompression = (router: Router) => {
    router.use(compression({filter: checkCompression}));
}


export const handleCors = (router: Router) => {
    router.use(cors({
        credentials: true,
        origin: true
    }));
}


export const handleBodyRequestParsing = (router: Router) => {
    //Para poder interpretar los datos enviados desde formularios web
    router.use(urlencoded({extended: false}));
    //Interpretar los JSON que lleguen al BACKEND
    router.use(json());
}

export const handleHelmet = (router: Router) => {
    router.use(helmet());
    router.use(helmet.hidePoweredBy());
}