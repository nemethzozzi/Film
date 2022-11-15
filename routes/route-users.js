const express = require("express");
const bcrypt = require("bcryptjs");
const UserDAO = require('../dao/user-dao');
const FilmDAO = require('../dao/film-dao');
const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const router = express.Router();

router.get("/", async (req, res) => {
//ez a régi / get a route-dogs-ból
    /*let dogs = await new DogDAO().getDogs();
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
    });*/

     return res.render('index', {

    });
});

router.get("/regisztracio", async (req, res) => { //teszt
    /*const token = req.cookies.jwt
    var current_role;
    
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }*/
    return res.render('regisztracio', { //TESZT
        //current_role: current_role
    });
});

router.get("/login", async (req, res) => {
    /*const token = req.cookies.jwt
    var current_role;
    
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            current_role = decodedToken.role;
        })
    }*/
    return res.render('login', {
        //current_role: current_role
    });
});

/*router.post("/loginuser", async (req, res) => {
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
});*/

/*
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
});*/



router.get("/profil", async (req, res) => {
    //const token = req.cookies.jwt
    //var current_role;

    return res.render('profil', {
        //current_role: current_role
    });
});

router.get("/szures", async (req, res) => {
    return res.render('szures', {
        //
    });
});

router.get("/megnezendo", async(req, res) => {
    //megnezendo string lekérése felhasznaloId-val DAO-n keresztül
    //megnezendo string szétszedése 
    //filmId-k alapján cím és képUrl lekérése DAO-val
    //átadása megnezendo oldalnak

    //SABLON KÓD:
    //let id = req.sessionStorage.id ?? valami ilyesmi
    
    let sample = "1;3;4;5;6;";
    let filmIds = sample.split(";")
    //loop-olashoz:
        /*let index = 0;
        while (filmIds[index] != '') {
        console.log('film id: ' + filmIds[index]);
        index++;
        }*/

    return res.render('megnezendo', {
        //átadott adatok
    });
});

router.post("/szurproba", async(req, res) => {
	let kaptam= JSON.parse(req.body.feltetelek);
	let lekerdezes = await new FilmDAO().szures(kaptam['rendezok'],kaptam['szineszek'],kaptam['mufaj'],kaptam['ev']);
	res.setHeader('Content-Type', 'application/json');
	res.end(typeof lekerdezes[0]+'');
    //res.end(JSON.stringify(lekerdezes[0])+'');
});

 

module.exports = router;