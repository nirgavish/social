import {Request, Response} from "express";
import {User} from "../entity/User";
import {Repo} from "../lib/repos";

class AuthControllerClass {

    public routes = [
        {path: "login", method: "post", functionName: "login"},
        {path: "logout", method: "delete", functionName: "logout"},
        {path: "identity", method: "get", functionName: "identity"},
    ];

    public identity(req: Request, res: Response): any {
        const identity = req["session"].user;
        if (identity) {
            res.json(User.stripBeforeSend(identity));
        } else {
            res.status(401).send();
        }
    }

    public logout(req: Request, res: Response): any {
        console.warn("logout");
        req["session"].destroy();
        res.status(200).send();
    }

    public login(req: Request, res: Response) {

        (async () => {
            if (!req.body.email || !req.body.password) {
                res.status(401).send();
            } else {
                const foundUser = await Repo(User).findOne({email: req.body.email, password: User.hashPassword(req.body.password)});
                if (foundUser) {
                    req["session"].user = foundUser;
                    this.identity(req, res);
                } else {
                    res.status(401);
                }
                res.send();
            }
        })();
    }

}

export const AuthController = new AuthControllerClass();
