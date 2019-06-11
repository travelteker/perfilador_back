import EHttpException from '../http.exception';

class EConncectMongoDB extends EHttpException {
    
    public name: string = 'ERROR_CONNECTION_MONGODB';

    constructor(public code: number) {
        super('ERROR_CONNECTION_MONGODB');
        this.code = code;
    }
    
}

export default EConncectMongoDB;