const express = require("express");
const router = express.Router();
const FilmDAO = require('../dao/film-dao');
const UserDAO = require('../dao/user-dao');
const {userAuth, jwtSecret} = require("../config/auth.js");
const jwt = require("jsonwebtoken")

router.get("/proba", async (req, res) => {
    //let lekerdezes = await new FilmDAO().szures(['rendezo1','rendezo2'],['szinesz1','szinesz2'],['mufaj1','mufaj2'],['2010','2020']);
	let lekerdezes = await new FilmDAO().szures([],[],[],['krimi'],[]);//keresztapa-id:6
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

    /*for (const dog of dogs) {
        let user = await new UserDAO().getUserById(dog.owner_id);
        user_mails.push(user.email);
    };*/

    return res.render('proba', {
        lekerdezes: lekerdezes[0],
		lekerdezes2: lekerdezes[1],
        user_mails: user_mails,
        current_email: current_email,
        current_role: current_role
    });
});

router.get("/upload", async (req, res) => {
    return res.render('upload',{
        //
    });
});

router.post("/filmfeltoltes", async (req, res) => {
    let cim = req.body.cim;
    let leiras = req.body.leiras;
    let kepUrl = req.body.kepUrl
    let elozetesLink = req.body.elozetesLink;
    let megjelenes = req.body.megjelenes;
    
    console.log("/filmfeltoltes call");
    console.log('cim: ', cim);
	
    let lekerdezes = await new FilmDAO().filmfeltoltes(cim, leiras, kepUrl, elozetesLink, megjelenes);
   
    return res.render('upload', { //it eredetileg 'proba'
        //lekerdezes: lekerdezes
    });
});

//uj routeok innen kezdodnek
router.post("/felhasznalofeltoltes", async (req, res) => {
    let nev = req.body.nev;
    let felhasznaloTipus = req.body.felhasznaloTipus;
    let megnezendoFilmek = req.body.megnezendoFilmek;
    let ertekeltFilmek = req.body.ertekeltFilmek;
    let email = req.body.email;
    let jelszo = req.body.jelszo;
    let kedvencek = req.body.kedvencek;

    let lekerdezes = await new FilmDAO().felhasznalofeltoltes(nev, felhasznaloTipus, megnezendoFilmek, ertekeltFilmek, email, jelszo, kedvencek);
                                        //paraméterek: nev, felhasznaloTipus, megnezendoFilmek, ertekeltFilmek, email, jelszo, kedvencek
    return res.render('upload', {});
});

router.post("/szemelyfeltoltes", async (req, res) => {
    let szemelyNev = req.body.szemelyNev;
    let szemelyLeiras = req.body.szemelyLeiras;

    let lekerdezes = await new FilmDAO().szemelyfeltoltes(szemelyNev, szemelyLeiras);
                                            //paraméterek: szemelyNev, szemelyLeiras
    return res.render('upload', {});
});

router.post("/rendezfeltoltes", async (req, res) => {
    let szemelyId = req.body.szemelyId;
    let filmId = req.body.filmId;

    let lekerdezes = await new FilmDAO().rendezfeltoltes(szemelyId, filmId);
                                        //paraméterek: szemelyId, filmId
    return res.render('upload', {});
});

router.post("/kommentelfeltoltes", async(req, res) => {
    let filmId = req.body.filmId;
    let felhasznaloId = req.body.felhasznaloId;
    let szoveg = req.body.szoveg;
    let ido = req.body.ido;

    let lekerdezes = await new FilmDAO().kommentelfeltoltes(filmId, felhasznaloId, szoveg, ido);
                                            //paraméterek: filmId, felhasznaloId, szoveg, ido
    return res.render('upload', {});
});

router.post("/ertekelfeltoltes", async (req, res) => {
    let filmId = req.body.filmId;
    let felhasznaloId = req.body.felhasznaloId;
    let ertekeles = req.body.ertekeles;

    let lekerdezes = await new FilmDAO().ertekelfeltoltes(filmId, felhasznaloId, ertekeles);
                                            //paraméterek: filmId, felhasznaloId, ertekeles
    return res.render('upload', {});
});

router.post("/csoportositfeltoltes", async (req, res) =>{
    let mufajNev = req.body.mufajNev;
    let filmId = req.body.filmId;

    let lekerdezes = await new FilmDAO().csoportositfeltoltes( mufajNev, filmId);
                                            //paraméterek: mufajNev, filmId
    return res.render('upload', {});
});

router.post("/szerepelfeltoltes", async(req, res) => {
    let szemelyId = req.body.szemelyId;
    let filmId = req.body.filmId;

    let lekerdezes = await new FilmDAO().szerepelfeltoltes( szemelyId, filmId);
                                            //paraméterek: szemelyId, filmId
    return res.render('upload', {});
});





/*
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
*/
module.exports = router;