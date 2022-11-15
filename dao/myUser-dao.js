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

        
        id =  await db.query("SELECT id FROM Felhasznalo WHERE email = $1", [email]);
        nev =  await db.query("SELECT nev FROM Felhasznalo WHERE email = $1", [email]);
        tipus =  await db.query("SELECT tipus FROM Felhasznalo WHERE email = $1", [email]);
        email =  email;
        jelszo =  await db.query("SELECT jelszo FROM Felhasznalo WHERE email = $1", [email]);
        //jelszo-t biztos akarjuk visszaadni?
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