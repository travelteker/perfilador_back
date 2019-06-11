import EHttpException from '../http.exception';

class EAdminDB extends EHttpException {
    
    public name: string = 'DB OPERATION FAILED';

    constructor(public code: number) {
        super('DB OPERTATION FAILED');
        this.code = code;
    }
    
}

export default EAdminDB;