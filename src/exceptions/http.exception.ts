/*class EHttpException extends Error {
    public description: string;
    public code: number;

    constructor(code: number, description: string) {
        super(description);
        this.description = description;
        this.code = code;
    }
}
*/


class EHttpException extends Error {
    public description: string;
    public code: number = 0;

    constructor(description: string) {
        super(description);
        this.description = description;
    }
}


export default EHttpException;