const db = require('../config/db');

class myUserDAO {
    async getUserByEmail(email){
        // visszaad egy változót ami tárolja a lekérdezés eredményeit, email alapján
        let dbQuery = await db.query("SELECT id, nev, tipus, email, jelszo FROM Felhasznalo WHERE email = $1", [email]);
        if(dbQuery = null){
            return 'no match';
        }
        return dbQuery.rows[0];
    }

    async getUserDataByEmail(email){
        // ellenorzes nelkul visszaadja az adott emailcimhez tartozo felhasznalot tombkent
        // id-nev-tipus-email-jelszo formatumban
        // session kezeléshez hasznos, nem létfontosságú

        //update: tejlesen obsolete, később törlés

        let userData = new userData[5];
        userData[0] =  await db.query("SELECT id FROM Felhasznalo WHERE email = $1", [email]);
        userData[1] =  await db.query("SELECT nev FROM Felhasznalo WHERE email = $1", [email]);
        userData[2] =  await db.query("SELECT tipus FROM Felhasznalo WHERE email = $1", [email]);
        userData[3] =  email;
        userData[4] =  await db.query("SELECT jelszo FROM Felhasznalo WHERE email = $1", [email]);
        return userData;
    }

    async ujFelhasznalo(nev, email, jelszo) {
        // felhasználó beillesztése adatbázisba
        let tipus = "user";
        console.log(nev);
        let dbQuerry = await db.query("INSERT INTO felhasznalo (\"nev\", \"felhasznaloTipus\", \"email\", \"jelszo\") VALUES ($1, $2, $3, $4)", [nev, tipus, email, jelszo]).catch(console.log);
        return dbQuerry;
    };
};

module.exports = myUserDAO;