const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");

function showRegisterPage (req, res) {
    res.render("auth/register", { error: null});
}

async function register(req, res, next) {
    req.errorPage = "auth/register";

    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new AppError("All fields required.", 400);
        }
    
        const existingUser = await userModel.findOne({ email: email });
    
        if (existingUser) {
            throw new AppError("User already exists.", 409);
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        req.session.userId = newUser._id;
    
        res.redirect("/petal/notes/dashboard");

    } catch (error) {
        return next(error);
    }
}

function showLoginPage (req, res) {
    res.render("auth/login", { error: null});
}

async function login(req, res, next) {
    req.errorPage = "auth/login";

    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new AppError("All fields required.", 400);
        }

        const matchedUser = await userModel.findOne({ email }).select("+password");

        if (!matchedUser) {
            throw new AppError("Invalid email or password.", 400);
        }

        const isPasswordMatched = await bcrypt.compare(password, matchedUser.password);

        if (!isPasswordMatched) {
            throw new AppError("Invalid email or password.", 400);
        }

        req.session.userId = matchedUser._id;

        res.redirect("/petal/notes/dashboard");

    } catch (error) {
        return next(error);
    }
}

async function logout(req, res, next) {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }

        res.clearCookie('connect.sid');
        res.redirect("/petal/auth/login")
    })
}

module.exports = {
    showRegisterPage,
    register,
    showLoginPage,
    login,
    logout
};