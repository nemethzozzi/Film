const db = require('../config/db');

class FilmDAO {

	async szures(rendezok='', szineszek='', mufajok='', megjelenesi_evek='') {
		/*rendezo, szinész, műfaj, megjelenés éve*/
		if(rendezok=='' && szineszek=='' && mufajok=='' && megjelenesi_evek=='')
		{
			let lekerd = await db.query('select * from film')
				.catch(console.log);
			return lekerd;
		}
		
		let alap="select film.* from film,rendez,szerepel,csoportosit,szemely where film.\"filmId\"=rendez.\"filmId\" and film.\"filmId\"=szerepel.\"filmId\" and film.\"filmId\"=csoportosit.\"filmId\" and (rendez.\"szemelyId\" = szemely.\"szemelyId\" or szerepel.\"szemelyId\" = szemely.\"szemelyId\") and ( (1=0 or 1=1) ";
		//alap+="----";
		if(Array.isArray(rendezok))
		{
			alap+="and (1=0 ";
			for (var i=0; i<rendezok.length; i++)
				alap+= "or szemely.\"szemelyNev\" like '%"+rendezok[i]+"%' ";
			alap+=") ";
		} else if(rendezok!='') alap+= "and szemely.\"szemelyNev\" like '%"+rendezok+"%' ";
		
		if(Array.isArray(szineszek))
		{
			alap+="and (1=0 ";
			for (var i=0; i<szineszek.length; i++)
				alap+= "or szemely.\"szemelyNev\" like '%"+szineszek[i]+"%' ";
			alap+=") ";
		} else alap+= "and szemely.\"szemelyNev\" like '%"+szineszek+"%' ";
		
		if(Array.isArray(mufajok))
		{
			alap+="and (1=0 ";
			for (var i=0; i<mufajok.length; i++)
				alap+= "or csoportosit.\"mufajNev\" like '%"+mufajok[i]+"%' ";
			alap+=") ";
		} else alap+= "and szemely.\"szemelyNev\" like '%"+mufajok+"%' ";
		
		if(Array.isArray(megjelenesi_evek))
		{
			alap+="and (1=0 ";
			for (var i=0; i<megjelenesi_evek.length; i++)
				alap+= "or EXTRACT(YEAR FROM film.megjelenes) = '"+megjelenesi_evek[i]+"' ";
			alap+=") ";
		} else alap+= "and EXTRACT(YEAR FROM film.megjelenes) = '"+megjelenesi_evek+"' ";
		alap+=")";
		let result = await db.query(alap)
            .catch(console.log);
		
		
		return result.rows;
	}

	async filmfeltoltes(cim, leiras, megjelenes, elozetesLink) {
		let id=2;
		let results = await db.query("INSERT INTO film (cim, leiras, megjelenes, \"elozetesLink\") VALUES ($1, $2, $3, $4)", [cim, leiras, megjelenes, elozetesLink]).catch(console.log);
			return results;
	}

	/*
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
    };*/

};

module.exports = FilmDAO;