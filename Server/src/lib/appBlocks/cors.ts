export const Cors = (req, res, next) => {

    const allowedOrigins = [
        "http://localhost",
        "http://localhost:4200",
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
};
