import { Request, Response, NextFunction } from 'express';
import { object, string, number, validate, boolean, array, date } from 'joi';
import EWrongRequest from '../exceptions/wrongRequsest';


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


export const ApiKeyValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {

    /*
        Date.parse('2019-12-31T23:59:59.999Z') ---> 1577836799999 EPOCH MILI
        Date.now()                             ---> 1555790612586 EPOCH MILI
    */

    const schema = object().keys({
        active: boolean().required(),
        tag: array().sparse().items(string()).unique().required(),
        validUntil: object({
            utcms: number().greater(Date.now()).required(),
            iso: date().iso().greater(Date.now()).required()
        })
    }); 
    
    const { error, value } = validate(req.body, schema);
    if(error) {
        error.details.forEach( item => {
            if(item.context && item.context != undefined) {
                const errorField = item.context.key || '';
                const errorCode = getCodeInternalError(errorField);
                next(new EWrongRequest(errorCode));
            }
        });
    } else {
        next();
    }
    
}
