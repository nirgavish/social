// Express
import * as express from "express";

import * as bodyParser from "body-parser";
import "reflect-metadata";

// Typeorm
import {createConnection} from "typeorm";

// App Blocks
import {Cors} from "./lib/appBlocks/cors";
import {Mount} from "./lib/appBlocks/mount";
import {SessionStore} from "./lib/appBlocks/sessionStore";

// Middleware
import {Permissions} from "./lib/middleware/permissions";
import {WalledGarden} from "./lib/middleware/walledGarden";

// Routes
import {Routes} from "./routes";

createConnection().then(async (connection) => {

    const app = express();

    app.use(bodyParser.json());
    app.use(Cors);
    app.use(SessionStore);

    app["connection"] = connection;
    app.use(Permissions);
    app.use(WalledGarden);

    Mount(app, Routes);

    app.listen(5555);
    console.log("Server is up and running on port 5555");

}).catch((error) => console.log("TypeORM connection error: ", error));
