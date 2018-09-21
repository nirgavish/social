import {Request, Response} from "express";
import {User} from "../entity/User";
import {Repo} from "../lib/repos";

class ConfigControllerClass {

    public async list(req, res, nexrt) {
        res.json({
            serverUptime: process.uptime(),
            walledGarden: process.env.walledGarden,
            usersMayRegister: process.env.usersMayRegister,
            usersMayStartGroups: process.env.usersMayStartGroups,
        });
    }

}

export const ConfigController = new ConfigControllerClass();
