import {Request, Response} from "express";
// import {Config} from "../../../environments/dev.env";

export function WalledGarden(req: Request, res: Response, next) {
    // TODO: Can't logout when walledGarden set to true

/*
    if (process.env.walledGarden && !req.user.isLoggedIn) {
        if(req.originalUrl !== "/auth/login") {
            res.status(401).end();
            next(new Error("Unauthenticated user!"));
        } else {
            next();
        }
    } else {
        next();
    }
*/
next();
}
