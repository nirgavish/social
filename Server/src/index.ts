// Environment
import * as dotenv from "dotenv";
dotenv.config({path: "environments/.env"});

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

createConnection({
    type: "mysql",
    host: process.env.db_host,
    port: Number(process.env.db_port),
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    synchronize: true,
    entities: [
        "src/entity/*.ts",
    ],
    subscribers: [
        "src/subscriber/*.ts",
    ],
    migrations: [
        "src/migration/*.ts",
    ],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
    },
}).then(async (connection) => {

    const app = express();

    app.use(bodyParser.json());
    app.use(Cors);
    app.use(SessionStore);

    app["connection"] = connection;
    app.use(Permissions);
    app.use(WalledGarden);

    Mount(app, Routes);

    app.listen(process.env.server_port);
    console.log(`Server is up and running on port ${process.env.server_port}`);

}).catch((error) => console.log("TypeORM connection error: ", error));
