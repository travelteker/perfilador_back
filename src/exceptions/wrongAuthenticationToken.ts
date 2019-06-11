import EHttpException from './http.exception';


class EWrongAuthenticationToken extends EHttpException {
    
    public name: string = 'TOKEN_INVALID';

    constructor(public code: number) {
        super('TOKEN_INVALID');
        this.code = code;
    }
    
}

export default EWrongAuthenticationToken;