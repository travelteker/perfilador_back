import EHttpException from './http.exception';

/*
class EErrorServer extends HttpException {
    
    public name: string = 'SERVER_FAILED';
    public code: number = 9999;

    constructor() {
        super(9999, 'SERVER_FAILED');
    }
}
*/



class EErrorServer extends EHttpException {
    
    public name: string = 'SERVER_FAILED';

    constructor(public code: number) {
        super('SERVER_FAILED');
        this.code = code;
    }
    
}

export default EErrorServer;