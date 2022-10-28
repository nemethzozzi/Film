const db = require('../config/db');

class UserDAO {

    async createUser(email, password, role) {
        await db.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3)', [email, password, role])
            .catch(console.log);
        return;
    };

    async getUserById(id) {
        let result = await db.query('SELECT * FROM users WHERE id = $1', [id])
            .catch(console.log);
        return result.rows[0];
    };


    async getUserByEmail(email) {
        let result = await db.query('SELECT * FROM users WHERE email = $1', [email])
            .catch(console.log);
        return result.rows[0];
    };



};

module.exports = UserDAO;