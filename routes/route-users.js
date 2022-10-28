const express = require("express");
const bcrypt = require("bcryptjs");
const UserDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const router = express.Router();

router.get("/register", async (req, res) => {
    const token = req.cookies.jwt
    var current_role;
    
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }
    return res.render('register', {
        current_role: current_role
    });
});

router.get("/login", async (req, res) => {
    const token = req.cookies.jwt
    var current_role;
    
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }
    return res.render('login', {
        current_role: current_role
    });
});

router.post("/loginuser", async (req, res) => {
    let {email} = req.body;
    let {password} = req.body;

    const user = await new UserDAO().getUserByEmail(email);

    if (!user) {
        res.status(400).json({
            message: "Login not successful",
        })
    } else {
        bcrypt.compare(password, user.password).then(function(result) {
            if (result) {
                const token = jwt.sign({
                        id: user.id,
                        email,
                        role: user.role
                    },
                    jwtSecret.jwtSecret
                );
                res.cookie("jwt", token, {
                    httpOnly: true
                });
                return res.redirect('/')
            } else {
                res.status(400).json({
                    message: "Login not succesful"
                });
            }
        });
    }
});

router.post("/registeruser", async (req, res) => {
    let {email} = req.body;
    let {password} = req.body;
    let {role} = req.body;
    
    bcrypt.hash(password, 10).then(async (hash) => {
        await new UserDAO().createUser(email, hash, role)
    });
    
    return res.redirect('/')
});

router.get("/logout", (req, res) => {
    res.cookie("jwt", "", {
        maxAge: "1"
    })
    res.redirect("/")
});

module.exports = router;