import config from "config";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/IUser";
import { ApiError } from "../utils/APIError";
import { injectable } from "inversify";
import { ObjectId } from "mongoose";
import fs from 'fs';
import path from 'path'
@injectable()
export class UserService {
    async signUp(userData: IUser) {
        try {
            const hasedpassword = await bcrypt.hash(userData.password, 10);
            userData.password = hasedpassword;
            const response = await User.create(userData);
            if (response) {
                return {
                    status: true,
                    statusCode: 200,
                    content: "USER SIGNED UP SUCCESFULLY",
                };
            } else {
                throw new ApiError(500, "ERROR IN CREATING USER");
            }
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.statusCode || 500,
                content: error.message,
            };
        }
    }
    async login(userData: IUser) {
        try {
            const user = await User.findOne({ email: userData.email });
            if (!user) {
                throw new ApiError(404, "USER NOT FOUND");
            }
            const isValidate = await bcrypt.compare(userData.password, user.password);
            if (!isValidate) {
                throw new ApiError(400, "INVALID CREDENTIALS");
            }
            const payload: JwtPayload = {
                userId: user._id,
                email: user.email,
                role: user.role,
            };
            const token = await jwt.sign(payload, config.get("SECRETKEY") as string, {
                expiresIn: "24h",
            });
            const response = {
                name: user.name,
                role: user.role,
                accessToken: token,
                message: "USER LOGGED IN SUCCESSFULLY",
            };
            return { status: true, statusCode: 200, content: response };
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.statusCode || 500,
                content: error.message,
            };
        }
    }
    async updateUser(userId: string, userData: IUser) {
        try {
            const response = await User.findByIdAndUpdate(userId, userData);
            if (response) {
                return {
                    status: true,
                    statusCode: 200,
                    content: "USER UPDATED SUCCESFULLY",
                };
            } else {
                throw new ApiError(500, "ERROR IN UPDATING USER");
            }
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.statusCode || 500,
                content: error.message,
            };
        }
    }
    async deleteUser(userId: string) {
        try {
            const response = await User.findByIdAndDelete(userId);
            if (response) {
                return {
                    status: true,
                    statusCode: 200,
                    content: "USER DELETED SUCCESFULLY",
                };
            } else {
                throw new ApiError(500, "ERROR IN DELETING USER");
            }
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.statusCode || 500,
                content: error.message,
            };
        }
    }
    async getParticularUser(id: ObjectId) {
        try {
            const response = await User.findById(id);
            if (response) {
                return {
                    status: true,
                    statusCode: 200,
                    content: response,
                };
            } else {
                throw new ApiError(500, "ERROR IN DELETING USER");
            }
        } catch (error: any) {
            return {
                status: false,
                statusCode: 500,
                content: error.message,
            };
        }
    }
    async updateParticularUser(userId: ObjectId, userData: IUser) {
        try {
             const user=await User.findById(userId);
            if(user){
                if(userData.profileImage){
                    fs.unlink(path.join(__dirname,'..','..', 'public', 'uploads', `${user.profileImage}`),
                    (err => {
                        if (err) console.log(err);
                    }));
                }
            }
            const response = await User.findByIdAndUpdate(userId, {profileImage:userData.profileImage});
            if (response) {
                return {
                    status: true,
                    statusCode: 200,
                    content: "USER UPDATED SUCCESFULLY",
                };
            } else {
                throw new ApiError(500, "ERROR IN UPDATING USER");
            }
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.statusCode || 500,
                content: error.message,
            };
        }
    }
}
