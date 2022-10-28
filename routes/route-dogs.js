const express = require("express");
const router = express.Router();
const DogDAO = require('../dao/dog-dao');
const UserDAO = require('../dao/user-dao');
const {userAuth, jwtSecret} = require("./../config/auth.js");
const jwt = require("jsonwebtoken")

router.get("/", async (req, res) => {
    let dogs = await new DogDAO().getDogs();
    var user_mails = [];
    const token = req.cookies.jwt
    var current_email;
    var current_role;
    
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            current_email = decodedToken.email;
            current_role = decodedToken.role;
        })
    };

    for (const dog of dogs) {
        let user = await new UserDAO().getUserById(dog.owner_id);
        user_mails.push(user.email);
    };

    return res.render('index', {
        dogs: dogs,
        user_mails: user_mails,
        current_email: current_email,
        current_role: current_role
    });
});

router.post("/add", async (req, res) => {
    let {name} = req.body;
    let {age} = req.body;
    const token = req.cookies.jwt
    var email;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            email = decodedToken.email;
        })
    }

    let user = await new UserDAO().getUserByEmail(email);
    await new DogDAO().createDog(name, age, user.id);
    return res.redirect('/')
});

router.get("/edit/:id", async (req, res) => {
    const token = req.cookies.jwt;
    let id = req.params.id;
   
    var current_role;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }
    let dog = await new DogDAO().getOneDog(id);

    res.render("update-dog", {
        model: dog,
        current_role: current_role
    });
});

router.post("/update/:id", async (req, res) => {
    let id = req.params.id;
    let {name} = req.body;
    let {age} = req.body;

    await new DogDAO().updateDog(id, name, age);
    res.redirect("/");
});

router.post("/delete/:id", async (req, res) => {
    let id = req.params.id;
    await new DogDAO().deleteDog(id);
    res.redirect("/");
});

module.exports = router;