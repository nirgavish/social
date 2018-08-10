import {Request, Response} from "express";
import {Config} from "../../../../app.config";

export function WalledGarden(req: Request, res: Response, next) {
    // TODO: Implement walled garden middleware
    next();
}
