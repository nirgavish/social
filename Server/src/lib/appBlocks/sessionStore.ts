import * as session from "express-session";
import * as sessionFilestore from "session-file-store";
const FileStore = sessionFilestore(session);

export const SessionStore = session({
    store: new FileStore({
        path: "./sessions",
        secret: "}6lSh,V}_*O|ZOip2X@\"Focdd\">Ga~Yc0*wbHU$9cuMf0A>W[u?3@A=zK_:rEv*",
        logFn: () => {},
        ttl: 3600000000000,
    }),
    secret: "}6lSh,V}_*O|ZOip2X@\"Focdd\">Ga~Yc0*wbHU$9cuMf0A>W[u?3@A=zK_:rEv*",
    resave: false,
    saveUninitialized: false,
})