const session = require("express-session");

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
});

module.exports = sessionMiddleware;