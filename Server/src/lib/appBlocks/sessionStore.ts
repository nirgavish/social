import * as session from "express-session";
import * as sessionFilestore from "session-file-store";
const FileStore = sessionFilestore(session);

export const SessionStore = session({
    store: new FileStore({
        path: "./sessions",
        secret: process.env.session_secret,
        logFn: () => {},
        ttl: 3600000000000,
    }),
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
})