import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";

export class RoleMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction) {
        try {
            if(req.user.role === 'Admin'){
                next()
            }else{
                throw new Error('Not Authorized')
            }
        } catch (error:any) {
            return res.json({status:false,message:error.message});
        }    
    }
}