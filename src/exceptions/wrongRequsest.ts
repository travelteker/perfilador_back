import EHttpException from './http.exception';


class EWrongRequest extends EHttpException {
    
    public name: string = 'REQUEST INVALID';

    constructor(public code: number) {
        super('REQUEST_INVALID');
        this.code = code;
    }
    
}

export default EWrongRequest;