import { injectable } from "inversify";
import { ICATEGORY } from "../interfaces/ICategory";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/APIError";
@injectable()
export class CategoryService{
    async addCategory(categoryData:ICATEGORY){
        try {
            const response=await Category.create(categoryData)
            if(response){
                return {status:true,statusCode:200,content:"CATEFORY ADDED SUCESSFULLY"}
            }else{
                throw new ApiError(500,"ERROR IN ADDING THE CATEGORY")
            } 
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async getParticularCategory(id:string){
        try {
            const response= await Category.findById(id)
            if(response){
                return {status:true,statusCode:200,content:response}
            }else{
                throw new ApiError(500,"ERROR IN GETTING THE CATEGORY")
            } 
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async getAllCategories(){
        try {
            const response=await Category.find()
            if(response){
                return {status:true,statusCode:200,content:response}
            }else{
                throw new ApiError(500,"ERROR IN GETTING THE CATEGORY")
            } 
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async updateCategory(id:string,categoryData:ICATEGORY){
        try {
            const response=await Category.findByIdAndUpdate(id,categoryData)
            if(response){
                return {status:true,statusCode:200,content:"CATEGORY SUCCESSFULLY UPDATED"}
            }else{
                throw new ApiError(500,"ERROR IN UPDATING THE CATEGORY")
            } 
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async deleteCategory(id:string){
        try {
            const data = await Product.find({categoryId:id})
            if(data.length>0){
                throw new ApiError(400,`PRODUCT OF THIS CATEGORY EXITS SO YOU CAN'T DELETE`)
            }
            const response=await Category.findByIdAndDelete(id)
            if(response){
                return {status:true,statusCode:200,content:"CATEGORY SUCCESSFULLY DELETED"}
            }else{
                throw new ApiError(500,"ERROR IN DELETING THE CATEGORY")
            }      
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
}