import { Request, Response } from 'express';




class UserController {


    constructor() {}

    /**
     * 
     */
    public createUser(req: Request, res: Response) {
        console.log(JSON.stringify(req.body));
        res.json({"user": "datos user"});
    }



}

export const _UserController = new UserController();

