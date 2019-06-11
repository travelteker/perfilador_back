import { Request, Response, NextFunction } from 'express';
import { object, string, validate } from 'joi';
import EUserValidation from '../exceptions/userValidation';

const FIRST_NAME_FAILURE: number = 2001;
const LAST_NAME_FAILURE: number = 2002;
const EMAIL_FAILURE: number = 2003;
const PASSWORD_FAILURE: number = 2004;

const getCodeInternalError = (field: string): number => {
    let code: number;
    switch(field) {
        case 'firstName':
            code = FIRST_NAME_FAILURE;
            break;
        case 'lastName':
            code = LAST_NAME_FAILURE;
            break;
        case 'email':
            code = EMAIL_FAILURE;
            break;
        case 'password':
            code = PASSWORD_FAILURE;
            break;
        default:
            code = 9999;
    }
    return code;
};


export const UserValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const schema = object().keys({
        firstName: string().trim().min(4).max(30).required(),
        lastName: string().trim().min(4).max(50).required(),
        email: string().email({minDomainAtoms: 2}).required(),
        password: string().min(32).max(64).required()
    }).with('email', 'password');

    const { error, value } = validate(req.body, schema);
    if(error) {
        error.details.forEach( item => {
            if(item.context && item.context != undefined) {
                const errorField = item.context.key || '';
                const errorCode = getCodeInternalError(errorField);
                next(new EUserValidation(errorCode));
            }
        });
    }
    next();
}
