const db = require('../config/db');

class UserDAO {

    async createUser(nev, email, password) {
        await db.query('INSERT INTO felhasznalo (nev, email, jelszo, \"felhasznaloTipus\") VALUES ($1, $2, $3, $4)', [nev,email, password, "user"])
            .catch(console.log);
        return;
    };

    async getUserById(id) {
        let result = await db.query('SELECT * FROM users WHERE id = $1', [id])
            .catch(console.log);
        return result.rows[0];
    };


    async getUserByEmail(email) {
        let result = await db.query('SELECT * FROM felhasznalo WHERE email = $1', [email])
            .catch(console.log);
        if(typeof result!="undefined") return result.rows[0];
		else return false;
    };



};

module.exports = UserDAO;