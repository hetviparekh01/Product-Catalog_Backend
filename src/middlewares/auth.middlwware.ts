import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import config from 'config'
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongoose";
import { User } from "../models/user.model";

export interface Token{
    userId:ObjectId,
    email:string,
    role:string
}
declare module 'express-serve-static-core'{
    interface Request{
        user:Token;
    }
}
export class AuthMiddleware extends BaseMiddleware {
    async handler(req: Request, res: Response, next: NextFunction) {
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.json({status:false,message:"USER IS NOT LOGGED IN"});
        }
        try {
            const decoded=jwt.verify(token,config.get("secretKey") as string)
            req.user=(decoded as Token);
            const userId=req.user.userId;
            const user=await User.findById(userId)
            if(!user){
                throw new Error("USER IS NOT SIGNED UP")
            }
            next()
        } catch (error:any) {
            return res.json({status:false,message:error.message});
        }
    }
}
export default AuthMiddleware;