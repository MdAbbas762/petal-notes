function authenticateUser(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/petal/auth/login");
    }

    req.user = { id: req.session.userId };

    next();
}

module.exports = authenticateUser;