import { Container } from "inversify";
import { UserService } from "../services/user.service";
import { TYPE } from "inversify-express-utils";
import { TYPES } from "../types/TYPE";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";
import AuthMiddleware from "../middlewares/auth.middlwware";
import { RoleMiddleware } from "../middlewares/role.middleware";

const container=new Container();

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<ProductService>(TYPES.ProductService).to(ProductService);
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
container.bind<RoleMiddleware>(TYPES.RoleMiddleware).to(RoleMiddleware);
export default container