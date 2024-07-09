import { NextFunction, Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { upload } from "../middlewares/multer.middleware";
import { ProductService } from "../services/product.service";
import { IPRODUCTS } from "../interfaces/IProduct";
import { TYPES } from "../types/TYPE";

@controller('/product',TYPES.AuthMiddleware)
export class ProductController{
    constructor(
        @inject<ProductService>(TYPES.ProductService) private productService:ProductService
    ){}

    @httpPost('/addproduct',TYPES.RoleMiddleware,upload.single('imagePath'))
    async addProduct(req:Request,res:Response){
        try {

            let productData= req.body;
            productData.imagePath=req.file?.filename
            const response =await this.productService.addProduct(productData)
            if (response.status) {
              return res
                .status(response.statusCode)
                .json({ status: response.status, content: response.content });
            } else {
              return res
                .status(response.statusCode)
                .json({ status: false, content: response.content });
            }
        } catch (error:any) {
            return res
            .status(error.statusCode)
            .json({ status: false, content: error.message });
        }
    }

    @httpGet('/getproductbyid/:id')
    async getParticularProduct(req:Request,res:Response){
        try {
            const {id} = req.params
            const response =await this.productService.getProductById(id as string)
            if (response.status) {
              return res
                .status(response.statusCode)
                .json({ status: response.status, content: response.content });
            } else {
              return res
                .status(response.statusCode)
                .json({ status: false, content: response.content });
            }
        } catch (error:any) {
            return res
            .status(error.statusCode)
            .json({ status: false, content: error.message });
        }
    }

    @httpPut('/updateproduct/:id',TYPES.RoleMiddleware,upload.single('imagePath'))
    async updateProduct(req:Request,res:Response){
        try {
            const {id} = req.params
            const productData = req.body;
            productData.imagePath=req.file?.filename
            const response = await this.productService.updateProduct(id as string,productData)
            if (response.status) {
              return res
                .status(response.statusCode)
                .json({ status: response.status, content: response.content });
            } else {
              return res
                .status(response.statusCode)
                .json({ status: false, content: response.content });
            }
        } catch (error:any) {
            return res
            .status(error.statusCode)
            .json({ status: false, content: error.message });
        }
    }

    @httpDelete('/deleteproduct/:id',TYPES.RoleMiddleware)
    async deleteProduct(req:Request,res:Response){
        try {
            const {id} = req.params;
            const response =  await this.productService.deleteProduct(id as string)
            if (response.status) {
              return res
                .status(response.statusCode)
                .json({ status: response.status, content: response.content });
            } else {
              return res
                .status(response.statusCode)
                .json({ status: false, content: response.content });
            }
        } catch (error:any) {
            return res
            .status(error.statusCode)
            .json({ status: false, content: error.message });
        }
    }

    @httpGet('/getallproducts')
    async getAllProducts(req:Request,res:Response){
        try {
            const queryParams = req.query;
            const response = await this.productService.getAllProducts(queryParams)
            if (response.status) {
              return res
                .status(response.statusCode)
                .json({ status: response.status, content: response.content });
            } else {
              return res
                .status(response.statusCode)
                .json({ status: false, content: response.content });
            }
        } catch (error:any) {
            return res
            .status(error.statusCode)
            .json({ status: false, content: error.message });
        }
    }
}