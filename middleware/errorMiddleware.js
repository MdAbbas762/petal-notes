function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500);

    if (err.name === "ValidationError") {
        const template = req.errorPage || "error";

        if (req.errorPage === "notes/createNote") {
            return res.render(template, { error: "Title or description has an invalid length." });
        }

        if (req.errorPage === "notes/editNote") {
            return res.render(template, {
                userNote: req.note,
                redirectPath: req.redirectPath,
                error: "Title or description has an invalid length."
            });
        }

        return res.render(template, { error: "Invalid input" });
    }

    if (req.errorPage) {
        if (req.errorPage === "notes/editNote") {
            return res.render(req.errorPage, {
                userNote: req.note,
                redirectPath: req.redirectPath,
                error: err.message
            });
        }

        return res.render(req.errorPage, { error: err.message });
    }

    return res.render("error");
}

module.exports = errorHandler;