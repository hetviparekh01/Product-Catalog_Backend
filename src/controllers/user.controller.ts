import { Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "../services/user.service";
import { TYPES } from "../types/TYPE";
import { IUser } from "../interfaces/IUser";
import { upload } from "../middlewares/multer.middleware";
@controller("/user")
export class AuthController {
  constructor(
    @inject<UserService>(TYPES.UserService) private userService: UserService
  ) {}
  @httpPost("/signup", upload.single("profileImage"))
  async signUp(req: Request, res: Response) {
    try {
      let userData: IUser = req.body;
      userData.profileImage = req.file?.filename as string;
      console.log(userData);
      const response = await this.userService.signUp(userData);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: false, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }
  @httpPost("/login")
  async login(req: Request, res: Response) {
    try {
      const userData: IUser = req.body;
      const response = await this.userService.login(userData);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }
  @httpPut("/updateuser/:id")
  async updateUser(req: Request, res: Response) {
    try {
      const userData: IUser = req.body;
      const userId: string = req.params.id;
      const response = await this.userService.updateUser(userId, userData);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }
  @httpDelete("/deleteuser/:id")
  async deleteUser(req: Request, res: Response) {
    try {
      const userId: string = req.params.id;
      const response = await this.userService.deleteUser(userId);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }

  @httpGet("/getparticularuser",TYPES.AuthMiddleware)
  async getParticularUser(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
        const response = await this.userService.getParticularUser(userId);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json({ status: false, content: error.message });
    }
  }
  @httpPut("/updateparticularuser",TYPES.AuthMiddleware,upload.single('profileImage'))
  async updateParticularUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const userId = req.user.userId;
      userData.profileImage=req.file?.filename
      const response = await this.userService.updateParticularUser(userId, userData);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode||500)
        .json({ status: false, content: error.message });
    }
  }
}