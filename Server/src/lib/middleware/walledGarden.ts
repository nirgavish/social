import {Request, Response} from "express";
import {Config} from "../../../../app.config";

export function WalledGarden(req: Request, res: Response, next) {
    // TODO: Can't logout when walledGarden set to true

    if (Config.walledGarden && !req.user.isLoggedIn) {
        if(req.originalUrl !== "/auth/login") {
            res.status(401).end();
            next(new Error("Unauthenticated user!"));
        } else {
            next();
        }
    } else {
        next();
    }

}
