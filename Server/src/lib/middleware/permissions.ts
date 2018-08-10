import {Request, Response} from "express";

export function Permissions(req: Request, res: Response, next) {
    req["user"] = req["session"].user || {};
    req["user"]["isLoggedIn"] = (req["session"] && req["session"].user && req["session"].user.id) ? true : false;
    next();
}
