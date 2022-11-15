const db = require('../config/db');

class myUserDAO {
    async getUserByEmail(email){
        // visszaad egy változót ami tárolja a lekérdezés eredményeit, email alapján
        let dbQuery = await db.query("SELECT \"felhasznaloId\", nev, felhasznaloTipus, email, jelszo FROM Felhasznalo WHERE email = $1", [email]);
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

        
        let id =  await db.query("SELECT \"felhasznaloId\" FROM Felhasznalo WHERE email = $1", [email]);
        let nev =  await db.query("SELECT nev FROM Felhasznalo WHERE email = $1", [email]);
        let tipus =  await db.query("SELECT \"felhasznaloTipus\" FROM Felhasznalo WHERE email = $1", [email]);
        //let email =  email; fölös
        let jelszo =  await db.query("SELECT jelszo FROM Felhasznalo WHERE email = $1", [email]);
        //jelszo-t biztos akarjuk visszaadni?
        //let megnezendo = await db.query(); EZT MEGCSINÁLNI
        let userData = [id, nev, tipus, email, jelszo];
        return userData;
    }

    async ujFelhasznalo(nev, email, hashedpassword) {
        // felhasználó beillesztése adatbázisba
        let tipus = "user";
        await db.query("INSERT INTO felhasznalo (\"nev\", \"felhasznaloTipus\", \"email\", \"jelszo\") VALUES ($1, $2, $3, $4)", [nev, tipus, email, hashedpassword]).catch(console.log);
        return;
    };
};

module.exports = myUserDAO;