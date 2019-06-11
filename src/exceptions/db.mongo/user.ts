import EHttpException from '../http.exception';

class EUserDB extends EHttpException {
    
    public name: string = 'USER SERVICE DB FAILED';

    constructor(public code: number) {
        super('USER SERVICE DB FAILED');
        this.code = code;
    }
    
}

export default EUserDB;