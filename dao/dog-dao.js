const db = require('../config/db');

class DogDAO {

    async getDogs() {
        let results = await db.query(`SELECT * FROM dogs`).
        catch(console.log);
        return results.rows;
    };

    async getOneDog(id) {
        let result = await db.query('SELECT * FROM dogs WHERE id = $1', [id])
            .catch(console.log);
        return result.rows[0];
    };

    async createDog(name, age, owner_id) {
        await db.query('INSERT INTO dogs (name, age, owner_id) VALUES ($1, $2, $3)', [name, age, owner_id])
            .catch(console.log);
        return;
    };

    async updateDog(id, name, age) {
        await db.query(`UPDATE dogs SET name = $1, age = $2 WHERE id = $3`, [name, age, parseInt(id)])
            .catch(console.log);

        return;
    };

    async deleteDog(id) {
        await db.query(`DELETE FROM dogs WHERE id=$1`, [parseInt(id)])
            .catch(console.log);

        return;
    };

};

module.exports = DogDAO;