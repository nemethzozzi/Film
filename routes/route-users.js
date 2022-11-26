const express = require("express");
const bcrypt = require("bcryptjs");
const UserDAO = require('../dao/user-dao');
const FilmDAO = require('../dao/film-dao');
const jwt = require("jsonwebtoken")
const jwtSecret = require("./../config/auth.js");
const myUserDAO = require("../dao/myUser-dao");
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
	
	/*const token = req.cookies.jwt;
    var email='';
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            email = decodedToken.email;
        })
    } let felh_adatok = await new UserDAO().getUserByEmail(email);
	*/
	let filmek = await new FilmDAO().leker("select * from film order by \"filmId\" desc limit 10");
	
	let bejelentkezve=""//(token)?true:false;
	let felh_nev = ""//(token)?felh_adatok.nev:"";
	
	return res.render('index', {
		filmek:filmek,
		bejelentkezve: bejelentkezve,
		felh_nev:felh_nev
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

router.post("/userlogin", async (req, res) => {
    var email = req.body.email;
    var password = req.body.jelszo;
	console.log("bejelentkezett email: "+email);
    const user = await new UserDAO().getUserByEmail(email);

    if (!user) {
        res.status(400).json({
            message: "Sikertelen bejelentkezés."
        });
    } else {
        bcrypt.compare(password, user.jelszo).then(function(result) {
            if (result) { 
                const token = jwt.sign({
                        id: user.felhasznaloId,
                        email:email,
                        role: user.felhasznaloTipus
                    },
                    jwtSecret.jwtSecret
                );
                res.cookie("jwt", token, {
                    httpOnly: true
                });
                return res.redirect('/');
            } else {
                res.status(400).json({
                    message: "Helytelen adatok."
                });
            }
        });
    }
});


router.post("/registeruser", async (req, res) => {
	let nev = req.body.nev;
    let email = req.body.email;
    let password = req.body.password;
	
    
    bcrypt.hash(password, 10).then(async (hash) => {
        await new UserDAO().createUser(nev,email, hash)
    });
    
    return res.redirect('/')
});


router.get("/logout", (req, res) => {
    res.cookie("jwt", "", {
        maxAge: "1"
    })
    res.redirect("/")
});



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


router.get("/film", async (req, res) => {
	let film = await new FilmDAO().leker("select * from film where \"filmId\" = $1",[req.query.id]);
	let rendezok = await new FilmDAO().leker("select szemely.\"szemelyNev\" from rendez,szemely where rendez.\"filmId\" = $1 and rendez.\"szemelyId\"=szemely.\"szemelyId\"",[req.query.id]);
	let szineszek = await new FilmDAO().leker("select szemely.\"szemelyNev\" from szerepel,szemely where szerepel.\"filmId\" = $1 and szerepel.\"szemelyId\"=szemely.\"szemelyId\"",[req.query.id]);
    //majd az értékelést még meg kell, ha kész lesz a session-os dolog
	return res.render('film',{
        filmadatok:film[0],
		rendezok:rendezok,
		szineszek:szineszek
    });
});
router.post("/hozzaszol", async(req, res) => {
	let szoveg= req.body.szoveg;
	let rendezok = await new FilmDAO().leker("insert into kommentel (\"filmId\",\"felhasznaloId\",szoveg,ido)");
	
	//"INSERT INTO film (cim, leiras, \"kepUrl\", \"elozetesLink\", megjelenes) VALUES ($1, $2, $3, $4, $5)", [cim, leiras, kepUrl, elozetesLink, megjelenes]
	
	res.writeHead(301, { Location: "/film?id="+req.body.id });
    res.end();
});




router.get("/megnezendo", async(req, res) => {
    //megnezendo string lekérése felhasznaloId-val DAO-n keresztül
    //megnezendo string szétszedése 
    //filmId-k alapján cím és képUrl lekérése DAO-val
    //átadása megnezendo oldalnak

    //SABLON KÓD:
    //let id = req.sessionStorage.id ?? valami ilyesmi
    
    let user = await new myUserDAO().getUserDataByEmail(email);
    let megnezendok = await new myUserDAO().megnezendoFilmek(user.megnezendoFilmek);
    //loop-olashoz:
        /*let index = 0;
        while (filmIds[index] != '') {
        console.log('film id: ' + filmIds[index]);
        index++;
        }*/

    return res.render('megnezendo', {
        megnezendok: megnezendok
    });
});

router.post("/szurproba", async(req, res) => {
	let kaptam= JSON.parse(req.body.feltetelek);
	let lekerdezes = await new FilmDAO().szures(kaptam['cim'],kaptam['rendezok'],kaptam['szineszek'],kaptam['mufaj'],kaptam['ev']);
	res.setHeader('Content-Type', 'application/json');
	//res.end(typeof lekerdezes[0]+'');
    res.end(JSON.stringify(lekerdezes[0])+'');
});

 

module.exports = router;