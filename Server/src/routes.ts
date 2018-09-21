import {AuthController} from "./controllers/auth.controller";
import {ConfigController} from "./controllers/config.controller";
import {GroupController} from "./controllers/group.controller";
import {PostController} from "./controllers/post.controller";
import {UserController} from "./controllers/user.controller";

export const Routes = [
    {route: "/", controller: ConfigController},
    {route: "/auth", controller: AuthController},
    {route: "/user", controller: UserController},
    {route: "/post", controller: PostController},
    {route: "/group", controller: GroupController},
];
