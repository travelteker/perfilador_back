import EHttpException from './http.exception';

/*
class EMissingToken extends HttpException {
    
    public name: string = 'TOKEN_FAILED';
    public code: number = 1001;

    constructor() {
        super(1001, 'TOKEN_FAILED');
    }
}
*/


class EMissingToken extends EHttpException {
    
    public name: string = 'TOKEN_FAILED';

    constructor(public code: number) {
        super('TOKEN_FAILED');
        this.code = code;
    }
    
}

export default EMissingToken;



