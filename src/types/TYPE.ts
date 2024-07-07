import AuthMiddleware from "../middlewares/auth.middlwware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { ProductService } from "../services/product.service";
import { UserService } from "../services/user.service";

export const TYPES={
    UserService:Symbol.for('UserService'),
    CategoryService:Symbol.for('CategoryService'),
    ProductService:Symbol.for('ProductService'),
    AuthMiddleware:Symbol.for('AuthMiddleware'),
    RoleMiddleware:Symbol.for('RoleMiddleware'),
}