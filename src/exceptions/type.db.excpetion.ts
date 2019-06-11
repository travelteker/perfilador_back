import EHttpException from './http.exception';



class ETypeDB extends EHttpException {
    
    public name: string = 'TYPE_DATABASE_NOT_FOUND';

    constructor(public code: number) {
        super('TYPE_DATABASE_NOT_FOUND');
        this.code = code;
    }
    
}

export default ETypeDB;