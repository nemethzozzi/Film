const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const myUserDAO = require('../dao/myUser-dao');
const { use } = require("./route-users");
const router = express.Router();
const jelszo = require("../public/classes/jelszo.js");

router.post("/userLogin", async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await new myUserDAO().getUserDataByEmail(email);
    console.log("email from input: " + email);
    console.log("email from db: " + user.email);
    console.log("passw from input: " + password);
    console.log("passw from db: " + user.jelszo);
    let valid = false;
    /*if(req.body.password == user.jelszo){
        valid = true;
    }*/
    valid = await new jelszo.compareIt(password, user.jelszo);
    console.log("valid erteke: " + valid);
    //ez ugy nagyon nem mukodik jelenleg :) segitseg
    
}); 
/*
router.post("/registeruser", async (req, res) => {
    let {email} = req.body;
    let {password} = req.body;
    let {role} = req.body;
    
    bcrypt.hash(password, 10).then(async (hash) => {
        await new UserDAO().createUser(email, hash, role)
    });
    
    return res.redirect('/')
});*/
router.post("/userRegister", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let nev = req.body.nev;
    /*var passwordAgain = req.body.passwordAgain;
    if(password != passwordAgain){
        alert("Registration failed, passwords do not match!");  
    }else{*/
    console.log("ezt kaptam névnek: " + nev);
    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(toString(password), salt);
    //let hashedpassword = password;
    const success = await new myUserDAO().ujFelhasznalo(nev, email, hashedpassword);
    const user = await new myUserDAO().getUserDataByEmail(email);
    //sessionStorage deklaráció
    /*sessionStorage.setItem("fId", user.id);
    sessionStorage.setItem("fNev", user.nev);
    sessionStorage.setItem("fTipus", user.tipus);
    sessionStorage.setItem("fEmail", user.email);*/
    //alert("You are logged in as: $1, $2, $3, $4", user.nev, user.email, user.tipus, user.id);
    res.render('profil', {
        user: user
    });
});
module.exports = router;