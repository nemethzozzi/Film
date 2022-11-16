const db = require('../config/db');

class myUserDAO {
    async getUserByEmail(email){
        // visszaad egy változót ami tárolja a lekérdezés eredményeit, email alapján
        let dbQuery = await db.query("SELECT \"felhasznaloId\", nev, \"felhasznaloTipus\", email, jelszo FROM felhasznalo WHERE email = $1", [email]);
        if(dbQuery = null){
            return 'no match';
        }
        return dbQuery.rows[0];
    }

    async getUserDataByEmail(email){
        // ellenorzes nelkul visszaadja az adott emailcimhez tartozo felhasznalot tombkent
        // id-nev-tipus-email-jelszo formatumban
        // session kezeléshez hasznos, nem létfontosságú

        let dbQuery =  await db.query("SELECT \"felhasznaloId\", nev, \"felhasznaloTipus\", jelszo FROM felhasznalo WHERE email = $1", [email]);
        //megnezendo-t is lekerni!!!!
        return dbQuery.rows[0];
    }

    async ujFelhasznalo(nev, email, hashedpassword) {
        // felhasználó beillesztése adatbázisba
        let tipus = "user";
        await db.query("INSERT INTO felhasznalo (\"nev\", \"felhasznaloTipus\", \"email\", \"jelszo\") VALUES ($1, $2, $3, $4)", [nev, tipus, email, hashedpassword]).catch(console.log);
        return;
    };
    async megnezendoFilmek(Id){
        //lekerdez a db-bol eloszor egy felhasznalo megnezendo stringet,
        //beleteszi az idekt egy tombbe, (ahol az utolso elem mindig ures st, azaz "")
        //aztan loopban beleteszi a tombbe a sorokat amik kellenek a film tablabol es ezt vissza adja

        let filmString = await db.query("SELECT \"megnezendoFilmek\" FROM felhasznalo WHERE \"felhasznaloId\" = $1", [Id]);
        var filmIdk = filmString.split(";");
        //lista vagy array ?
        let index = 0;
        let megnezendo = [];
        while(filmIdk[index] != ''){
            film = await db.query("SELECT cim, kepUrl FROM film WHERE filmId = $1", [filmIdk[i]]);
            megnezendo[index] = film;
            
        }
        return megnezendo;
    };
};

module.exports = myUserDAO;