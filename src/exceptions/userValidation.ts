import EHttpException from './http.exception';

class EUserValidation extends EHttpException {
    
    public name: string = 'USER STRUCTURE FAILED';

    constructor(public code: number) {
        super('USER STRUCTURE FAILED');
        this.code = code;
    }
    
}

export default EUserValidation;