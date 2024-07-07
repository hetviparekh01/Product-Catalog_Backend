import { NextFunction, Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { responseMessage, TYPES } from "../constants";
import { errorHandler } from "../utils";
import { inject } from "inversify";
import { ProductService } from "../services";
import { IPRODUCTS } from "../interfaces";
import multer from "multer";
import path from 'path'
const storageConfig = multer.diskStorage({
    destination: path.join(__dirname, "../public/"),
    filename: (req, file, res) => {
            const randomValue = Date.now()
            req.body.imagePath = path.join("/public/"+ randomValue + file.originalname)
            res(null, randomValue + file.originalname)
    }
})
const upload = multer(
    {
        storage: storageConfig,
        limits:{files:1},
        fileFilter:(req, file, callback)=> {
            if (!req.body.title || !req.body.description || !req.body.price || !req.body.categoryId) {
                callback(null,false)
            }else{
                callback(null,true)
            }
        },
    }
)
const multerErrorHandling = (err:any, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof multer.MulterError) {
      res.status(400).send("Multer error: " + err.message);
    } else {
      next();
    }
    };
@controller('/product',TYPES.AuthMiddleware)
export class ProductController{
    constructor(
        @inject<ProductService>(TYPES.ProductService) private productService:ProductService
    ){}

    @httpPost('/',TYPES.RoleMiddleware,upload.single('image'),multerErrorHandling)
    async addProduct(req:Request,res:Response):Promise<void>{
        try {
            const {title,description,price,imagePath,categoryId} = req.body as IPRODUCTS
            await this.productService.addProduct({title,description,price,imagePath,categoryId})
            res.json({status:true,statusCode:201,message:"Product Added"})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }

    @httpGet('/:id')
    async getParticularProduct(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params
            
            const data:IPRODUCTS[] = await this.productService.getProductById(id as string)
            res.json({status:true,statusCode:201,data})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }

    @httpPut('/:id',TYPES.RoleMiddleware,upload.single('image'),multerErrorHandling)
    async updateProduct(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params
            const {title,description,price,imagePath,categoryId} = req.body as IPRODUCTS
            await this.productService.updateProduct(id as string,{title,description,price,imagePath,categoryId})
            res.json({status:true,statusCode:200,message:"Product Updated"})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }
    @httpDelete('/:id',TYPES.RoleMiddleware)
    async deleteProduct(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params
            await this.productService.deleteProduct(id as string)
            res.json({status:true,statusCode:200,message:"Product Deleted"})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }

    @httpGet('/')
    async getAllProducts(req:Request,res:Response):Promise<void>{
        try {
            const {search} = req.query
            const data:IPRODUCTS[] = await this.productService.getAllProducts(search as string)
            res.json({status:true,statusCode:200,data})
        } catch (error) {
            const response = errorHandler(error)
            res.json({status:false,...response})
        }
    }
}