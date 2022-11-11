const db = require('../config/db');

class myUserDAO {
    async getUserByEmail(email){
        let dbQuery = db.query('SELECT * FROM users WHERE email = $1', [email]);
        if(dbQuery = ''){
            return 'no match';
        }
        return dbQuery.rows[0];
    }

    async getUserDataByEmail(email){
        // ellenorzes nelkul visszaadja az adott emailcimhez tartozo felhasznalot tombkent
        // id-nev-tipus-email-jelszo formatumban
        // session kezeléshez hasznos, nem létfontosságú

        let userData = new userData[5];
        userData[0] =  db.query('SELECT id FROM users WHERE email = $1', [email]);
        userData[1] =  db.query('SELECT nev FROM users WHERE email = $1', [email]);
        userData[2] =  db.query('SELECT tipus FROM users WHERE email = $1', [email]);
        userData[3] =  email;
        userData[4] =  db.query('SELECT jelszo FROM users WHERE email = $1', [email]);
        return userData;
    }
};

module.exports = myUserDAO;