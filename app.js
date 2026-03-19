const express = require("express");
const path = require("path");
const sessionMiddleware = require("./middleware/sessionConfig");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/noteRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(sessionMiddleware);

app.use("/petal/auth", authRoutes);
app.use("/petal/notes", notesRoutes);

app.use((req, res, next) => {
    return res.render("404");
})

app.use(errorMiddleware);

module.exports = app;