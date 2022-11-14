const express = require("express");
const bcrypt = require("bcryptjs");
const UserDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const myUserDAO = require("../dao/myUser-dao");
const { use } = require("./route-users");
const router = express.Router();


router.post("/userLogin", async (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    const user = await new myUserDAO().getUserDataByEmail(email);
    bcrypt.compare(password, user.jelszo).then(function(result){
        if(result){
            sessionStorage.setItem("fId", user.id);
            sessionStorage.setItem("fNev", user.nev);
            sessionStorage.setItem("fTipus", user.tipus);
            sessionStorage.setItem("fEmail", user.email);
            alert("you are logged in as: $1, $2, $3, $4", user.nev, user.email, user.tipus, user.id);
        }else{alert("wrong credentials! no login for you! >:(")}
    });
        
}); 
router.post("/userRegister", async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var nev = req.body.password;

    myUserDAO().ujFelhasznalo(nev, email, jelszo);
    const user = await new myUserDAO().getUserDataByEmail(email);
    bcrypt.compare(password, user.jelszo).then(function(result){
        if(result){
            sessionStorage.setItem("fId", user.id);
            sessionStorage.setItem("fNev", user.nev);
            sessionStorage.setItem("fTipus", user.tipus);
            sessionStorage.setItem("fEmail", user.email);
            alert("you are logged in as: $1, $2, $3, $4", user.nev, user.email, user.tipus, user.id);
        }else{alert("wrong credentials! no login for you! >:(")}
    });

});
module.exports = router;