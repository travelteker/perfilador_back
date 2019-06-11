import { Request, Response, NextFunction } from 'express';
import { object, string, validate } from 'joi';
import EWrongRequest from '../exceptions/wrongRequsest';
import { IGetToken } from '../interfaces';

const API_KEY_FAILURE: number = 3001;
const XCUS_FAILURE: number = 3002;


const getCodeInternalError = (field: string): number => {
    let code: number;
    switch(field) {
        case 'xapikey':
            code = API_KEY_FAILURE;
            break;
        case 'xcus':
            code = XCUS_FAILURE;
            break;
        default:
            code = 99993;
    }
    return code;
};


export const GetTokenValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let apikey: string = ''; 
    if(req.headers.xapikey && typeof(req.headers.xapikey) == 'string') {
        apikey = req.headers.xapikey;
    }
   

    let data: IGetToken = { 
        xapikey: apikey
    };

    const schema = object().keys({
        xapikey: string().trim().length(24).required()
    });

    const { error, value } = validate(data, schema);
    if(error) {
        console.log(error);
        error.details.forEach( item => {
            if(item.context && item.context != undefined) {
                const errorField = item.context.key || '';
                const errorCode = getCodeInternalError(errorField);
                next(new EWrongRequest(errorCode));
            }
        });
    } else {
        // Pasamos los parametros validados como parametros locales en la RESPONSE y los capturamos en el siguiente 
        // procesamiento de request (pila middleware)
        res.locals.xapikey = apikey;
        next();
    }
    
}
