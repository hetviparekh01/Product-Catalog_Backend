import { NextFunction, Request ,Response } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req: Request, file, cb) {
        cb(null, Date.now()+'-'+ file.originalname)
    }
})
export const multerErrorHandling = (err:any, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof multer.MulterError) {
      res.status(400).send("Multer error: " + err.message);
    } else {
      next();
    }
};

export const upload = multer({storage : storage})