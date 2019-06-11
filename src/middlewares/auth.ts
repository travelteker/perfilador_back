import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import EWrongAuthenticationToken from '../exceptions/wrongAuthenticationToken'
import EMissingToken from '../exceptions/missingToken';
import { JWT_SECRET } from '../utils'

const TOKEN_NOT_FOUND = 1000;
const TOKEN_NOT_VALID = 1010;
const TOKEN_VERIFY_FAILURE = 1011;

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const authorization = req.headers['authorization'] || '';

    if(authorization == "") {
        next(new EMissingToken(TOKEN_NOT_FOUND));
    } else {
        try {
            if(jwt.verify(authorization, JWT_SECRET)) {
                next();
            } else {
                next(new EWrongAuthenticationToken(TOKEN_NOT_VALID));
            }
        } catch(error) {
            next(new EWrongAuthenticationToken(TOKEN_VERIFY_FAILURE));
        }
    }
}
