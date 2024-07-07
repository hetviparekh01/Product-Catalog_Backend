import { injectable } from "inversify";
import mongoose, { PipelineStage } from "mongoose";
import { IPRODUCTS } from "../interfaces/IProduct";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/APIError";

@injectable()
export class ProductService{
    async addProduct(productData:IPRODUCTS){
        try {
            const response=await Product.create(productData)
            if(response){
                return {status:true,statusCode:200,content:"PRODUCT SUCCESSFULLY CREATED"}
            }else{
                throw new ApiError(500,"ERROR IN CREATING THE PRODUCT")
            }
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async getProductById(id:string){
        try {
            const response=await Product.findById(id)
            if(response){
                return {status:true,statusCode:200,content:response}
            }else{
                throw new ApiError(500,"ERROR IN GETTING THE PRODUCT")
            }
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async updateProduct(id:string,productData:IPRODUCTS){
        try {
            const response= await Product.findByIdAndUpdate(id,productData)
            if(response){
                return {status:true,statusCode:200,content:"PRODUCT SUCCESSFULLY UPDATED"}
            }else{
                throw new ApiError(500,"ERROR IN UPDATING THE PRODUCT")
            }
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async deleteProduct(id:string){
        try {
            const response=await Product.findByIdAndDelete(id)
            if(response){
                return {status:true,statusCode:200,content:"PRODUCT SUCCESSFULLY DELETED"}
            }else{
                throw new ApiError(500,"ERROR IN DELETING THE PRODUCT")
            }
            
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async getAllProducts(search:string){
        try {
            const response=await Product.find({})
            if(response){
                return {status:true,statusCode:200,content:response}
            }else{
                throw new ApiError(500,"ERROR IN GETTING THE PRODUCT")
            }
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
}