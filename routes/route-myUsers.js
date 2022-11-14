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
            alert("You are logged in as: $1, $2, $3, $4", user.nev, user.email, user.tipus, user.id);
        }else{alert("wrong credentials! no login for you! >:(")}
    });
        
}); 
router.post("/userRegister", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let nev = req.body.nev;
    /*var passwordAgain = req.body.passwordAgain;
    if(password != passwordAgain){
        alert("Registration failed, passwords do not match!");  
    }else{*/
    let salt = bcrypt.genSaltSync(10);
    let hashedpassword = bcrypt.hashSync(toString(password), salt);
    const success = await new myUserDAO().ujFelhasznalo(nev, email, hashedpassword);
    /*const user = await new myUserDAO().getUserDataByEmail(email);
    sessionStorage.setItem("fId", user.id);
    sessionStorage.setItem("fNev", user.nev);
    sessionStorage.setItem("fTipus", user.tipus);
    sessionStorage.setItem("fEmail", user.email);
    */
    alert("You are logged in as: $1, $2, $3, $4", user.nev, user.email, user.tipus, user.id);
    
});
module.exports = router;