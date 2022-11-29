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
	
	const token = req.cookies.jwt;
    var email='';
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            email = decodedToken.email;
        })
    } let felh_adatok = await new UserDAO().getUserByEmail(email);
	
	let filmek = await new FilmDAO().leker("select * from film order by \"filmId\" desc limit 10");
	
	let bejelentkezve=(token)?true:false;
	
	return res.render('index', {
		filmek:filmek,
		bejelentkezve: bejelentkezve,
		felh_adatok:felh_adatok
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
	const token = req.cookies.jwt;
    var email='';
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            email = decodedToken.email;
        })
    } let felh_adatok = await new UserDAO().getUserByEmail(email);
	
	if(felh_adatok.ertekeltFilmek==null)
	{	
		await new FilmDAO().leker("update felhasznalo set \"ertekeltFilmek\"=';' where \"felhasznaloId\"="+felh_adatok.felhasznaloId);
		felh_adatok = await new UserDAO().getUserByEmail(email);
	}
	
	let film = await new FilmDAO().leker("select * from film where \"filmId\" = $1",[req.query.id]);
	let rendezok = await new FilmDAO().leker("select szemely.\"szemelyNev\" from rendez,szemely where rendez.\"filmId\" = $1 and rendez.\"szemelyId\"=szemely.\"szemelyId\"",[req.query.id]);
	let szineszek = await new FilmDAO().leker("select szemely.\"szemelyNev\" from szerepel,szemely where szerepel.\"filmId\" = $1 and szerepel.\"szemelyId\"=szemely.\"szemelyId\"",[req.query.id]);
	
	let ertekelesosszeg=0;
	if(film[0].ertekelesOsszege==null)
	{
		await new FilmDAO().leker("update film set \"ertekelesOsszege\"=0 where \"filmId\"="+film[0].filmId);
	} else ertekelesosszeg=film[0].ertekelesOsszege;
	
	let ertekelesszam=0;
	if(film[0].ertekelesekSzama==null)
	{
		await new FilmDAO().leker("update film set \"ertekelesekSzama\"=0 where \"filmId\"="+film[0].filmId);
	} else ertekelesszam=film[0].ertekelesekSzama;
	
	let ertekeltemar= (felh_adatok.ertekeltFilmek.includes(";"+film[0].filmId+";"))?true:false;
	
	//majd az értékelést még meg kell, ha kész lesz a session-os dolog
	return res.render('film',{
        filmadatok:film[0],
		felh_adatok:felh_adatok,
		rendezok:rendezok,
		szineszek:szineszek,
		ertekelesosszeg:ertekelesosszeg,
		ertekelesszam:ertekelesszam,
		ertekeltemar:ertekeltemar
    });
});

router.post("/ertekel", async (req, res) => {
	let filmid = req.body.ertekel.split(';')[1];
	let felhid = req.body.ertekel.split(';')[0];
	let ertekeles = req.body.ertekel.split(';')[2];
	
	await new FilmDAO().leker("update film set \"ertekelesekSzama\"=\"ertekelesekSzama\"+1,\"ertekelesOsszege\"=\"ertekelesOsszege\"+"+ertekeles+"  where \"filmId\"="+filmid);
	await new FilmDAO().leker("update felhasznalo set \"ertekeltFilmek\"=concat(\"ertekeltFilmek\",'"+filmid+";') where \"felhasznaloId\"="+felhid);
	
	let film = await new FilmDAO().leker("select \"ertekelesekSzama\",\"ertekelesOsszege\" from film where \"filmId\" ="+filmid);
	
	res.end(''+(film[0].ertekelesOsszege*1.0/film[0].ertekelesekSzama*1.0).toFixed(2));
});

router.post("/hozzaszol", async(req, res) => {
	let szoveg= req.body.szoveg;
	let rendezok = await new FilmDAO().leker("insert into kommentel (\"filmId\",\"felhasznaloId\",szoveg,ido)");
	
	//"INSERT INTO film (cim, leiras, \"kepUrl\", \"elozetesLink\", megjelenes) VALUES ($1, $2, $3, $4, $5)", [cim, leiras, kepUrl, elozetesLink, megjelenes]
	
	res.writeHead(301, { Location: "/film?id="+req.body.id });
    res.end();
});


router.post("/filmhozzaad", async(req, res) => {
	let filmid = req.body.filmhozzaad.split(';')[1];
	let felhid = req.body.filmhozzaad.split(';')[0];
	
	await new FilmDAO().leker("update felhasznalo set \"megnezendoFilmek\"=concat(\"megnezendoFilmek\",'"+filmid+";') where \"felhasznaloId\"="+felhid);
    res.end();
});
router.post("/filmelvesz", async(req, res) => {
	let filmid = req.body.filmelvesz.split(';')[1];
	let felhid = req.body.filmelvesz.split(';')[0];
	
	let film = await new FilmDAO().leker("select \"megnezendoFilmek\" from felhasznalo where \"felhasznaloId\"="+felhid);
	let szoveg = film[0].megnezendoFilmek;
	console.log(szoveg+"\n");
	szoveg = szoveg.replace(';'+filmid+';',';')
	console.log(szoveg+"\n");
	await new FilmDAO().leker("update felhasznalo set \"megnezendoFilmek\"='"+szoveg+"' where \"felhasznaloId\"="+felhid);
	
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