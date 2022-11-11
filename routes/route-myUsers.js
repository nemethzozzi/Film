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
    bcrypt.compare(password, user[4]).then(function(result){
        if(result){
            sessionStorage.setItem("fId", user[0]);
            sessionStorage.setItem("fNev", user[1]);
            sessionStorage.setItem("fTipus", user[2]);
            sessionStorage.setItem("fEmail", user[3]);
            alert("you are logged in as: $1, $2, $3, $4", user[0], user[1], user[2], user[3]);
        }else{alert("wrong credentials! no login for you! >:(")}
    });
        
}); 
