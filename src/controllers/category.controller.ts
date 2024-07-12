import { Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { ICATEGORY } from "../interfaces/ICategory";
import { CategoryService } from "../services/category.service";
import { TYPES } from "../types/TYPE";


@controller('/category',TYPES.AuthMiddleware)
export class CategoryController{
    constructor(
        @inject<CategoryService>(TYPES.CategoryService) private categoryService:CategoryService
    ){}
    @httpPost('/addcategory',TYPES.RoleMiddleware)
    async addCategory(req:Request,res:Response){
        try {
            const categoryData = req.body;
            const response = await this.categoryService.addCategory(categoryData);
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
    @httpGet('/getcategorybyid/:id',TYPES.RoleMiddleware)
    async getParticularCategory(req:Request,res:Response){
        try {
            const id = req.params.id;
            const response = await this.categoryService.getParticularCategory(id)
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
    @httpGet('/getallcategories')
    async getAllCategories(req:Request,res:Response){
        try {
            const response = await this.categoryService.getAllCategories()
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
    @httpPut('/updatecategory/:id',TYPES.RoleMiddleware)
    async updateCategory(req:Request,res:Response){
        try {
            const {id} = req.params
            const categoryData = req.body as ICATEGORY;
            const response =await this.categoryService.updateCategory(id as string,categoryData)
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
    @httpDelete('/deletecategory/:id',TYPES.RoleMiddleware)
    async deleteCategory(req:Request,res:Response){
        try {
            const {id} = req.params
            const response = await this.categoryService.deleteCategory(id as string)
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
            .status(error.statusCode||500)
            .json({ status: false, content: error.message });
        }
    }

    
}