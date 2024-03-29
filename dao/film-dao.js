const db = require('../config/db');

class FilmDAO {

	async szures(cim='',rendezok='', szineszek='', mufajok='', megjelenesi_evek='') {/*majd id-s is lesz*/
		/*rendezo, szinész, műfaj, megjelenés éve*/
		
		if(cim=='' && rendezok=='' && szineszek=='' && mufajok=='' && megjelenesi_evek=='')
		{
			let lekerd = await db.query('select * from film')
				.catch(console.log);
			return [lekerd.rows,''];
		}
		
		let alap="select film.* from film,rendez,szerepel,csoportosit,szemely where film.\"filmId\"=rendez.\"filmId\" and film.\"filmId\"=szerepel.\"filmId\" and film.\"filmId\"=csoportosit.\"filmId\" and (rendez.\"szemelyId\" = szemely.\"szemelyId\" or szerepel.\"szemelyId\" = szemely.\"szemelyId\") ";
		//alap+="----";
		if((Array.isArray(rendezok) && rendezok[0]!='') || (Array.isArray(szineszek) && szineszek[0]!='')) alap+="and (1=0 ";
		if(Array.isArray(rendezok) && rendezok[0]!='')
		{
			alap+="or (1=0 ";
			for (var i=0; i<rendezok.length; i++)
				alap+= "or (rendez.\"szemelyId\" = szemely.\"szemelyId\" and szemely.\"szemelyNev\" like '%"+rendezok[i]+"%' )";
			alap+=") ";
		} else if(rendezok!='' && !Array.isArray(rendezok)) alap+= "or (rendez.\"szemelyId\" = szemely.\"szemelyId\" and szemely.\"szemelyNev\" like '%"+rendezok+"%' )";
		
		if(Array.isArray(szineszek) && szineszek[0]!='')
		{
			alap+="or (1=0 ";
			for (var i=0; i<szineszek.length; i++)
				alap+= "or (szerepel.\"szemelyId\" = szemely.\"szemelyId\" and szemely.\"szemelyNev\" like '%"+szineszek[i]+"%' )";
			alap+=") ";
		} else if(szineszek!='' && !Array.isArray(szineszek)) alap+= "or (szerepel.\"szemelyId\" = szemely.\"szemelyId\" and szemely.\"szemelyNev\" like '%"+szineszek+"%' )";
		if((Array.isArray(rendezok) && rendezok[0]!='') || (Array.isArray(szineszek) && szineszek[0]!='')) alap+=")";
		
		if(Array.isArray(cim) && cim[0]!='')
		{
			alap+=" and (1=0 ";
			for (var i=0; i<cim.length; i++)
				alap+= "or film.cim like '%"+cim[i]+"%' ";
			alap+=") ";
		}
		
		if(Array.isArray(mufajok) && mufajok[0]!='')
		{
			alap+="and (1=0 ";
			for (var i=0; i<mufajok.length; i++)
				alap+= "or csoportosit.\"mufajNev\" like '%"+mufajok[i]+"%' ";
			alap+=") ";
		} else if(mufajok!=''  && !Array.isArray(mufajok)) alap+= "and szemely.\"szemelyNev\" like '%"+mufajok+"%' ";
		
		if(Array.isArray(megjelenesi_evek) && megjelenesi_evek[0]!='')
		{
			alap+="and (1=0 ";
			for (var i=0; i<megjelenesi_evek.length; i++)
				alap+= "or EXTRACT(YEAR FROM film.megjelenes) = "+megjelenesi_evek[i]+" ";
			alap+=") ";
		} else if(megjelenesi_evek!='' && !Array.isArray(megjelenesi_evek)) alap+= "and EXTRACT(YEAR FROM film.megjelenes) = "+megjelenesi_evek+" ";
		alap+=" group by film.\"filmId\"";
		
		let result = await db.query(alap)
            .catch(console.log);
		
		//console.log("\n"+alap+"\n");
		
		//return [result.rows,alap];
		if(typeof result!="undefined")
			return [result.rows,alap];
		else return ["",alap];
		//return "";
	}
	
	async leker(lekerdezes,tomb) {
		let result = await db.query(lekerdezes,tomb)
            .catch(console.log);
		return result.rows;
	}

	async filmfeltoltes(cim, leiras, kepUrl, elozetesLink, megjelenes) {
		let results = await db.query("INSERT INTO film (cim, leiras, \"kepUrl\", \"elozetesLink\", megjelenes) VALUES ($1, $2, $3, $4, $5)", [cim, leiras, kepUrl, elozetesLink, megjelenes]).catch(console.log);
			return results;
	}

	async felhasznalofeltoltes(nev, felhasznaloTipus, megnezendoFilmek, ertekeltFilmek, email, jelszo, kedvencek) {
		let results = await db.query("INSERT INTO felhasznalo (\"nev\", \"felhasznaloTipus\", \"megnezendoFilmek\", \"ertekeltFilmek\", email, \"jelszo\", kedvencek) VALUES ($1, $2, $3, $4, $5, $6, $7)", [nev, felhasznaloTipus, megnezendoFilmek, ertekeltFilmek, email, jelszo, kedvencek]).catch(console.log);
			return results;
		//itt jelszo hash elés még kell!!!
	}

	async szemelyfeltoltes(szemelyNev, szemelyLeiras){
		let results = await db.query("INSERT INTO szemely (\"szemelyNev\", \"szemelyLeiras\") VALUES ($1, $2)", [szemelyNev, szemelyLeiras]).catch(console.log);
			return results;
	}

	async rendezfeltoltes(szemelyId, filmId){
		let results = await db.query("INSERT INTO rendez (\"szemelyId\", \"filmId\") VALUES ($1, $2)", [szemelyId, filmId]).catch(console.log);
			return results;
	}

	async kommentelfeltoltes(filmId, felhasznaloId, szoveg, ido){
		let results = await db.query("INSERT INTO kommentel (\"filmId\", \"felhasznaloId\", \"szoveg\", ido) VALUES ($1, $2, $3, $4)", [filmId, felhasznaloId, szoveg, ido]).catch(console.log);
			return results;
	}

	async ertekelfeltoltes(filmId, felhasznaloId, ertekeles){
		let results = await db.query("INSERT INTO ertekel (\"filmId\", \"felhasznaloId\", ertekeles) VALUES ($1, $2, $3)", [filmdId, felhasznaloId, ertekeles]).catch(console.log);
			return results;
	}

	async csoportositfeltoltes(mufajNev, filmId){
		let results = await db.query("INSERT INTO csoportosit (\"mufajNev\", \"filmId\") VALUES ($1, $2)", [mufajNev, filmId]).catch(console.log);
			return results;
	}

	async szerepelfeltoltes(szemelyId, filmId){
		let results = await db.query("INSERT INTO szerepel (\"szemelyId\", \"filmId\") VALUES ($1, $2)", [szemelyId, filmId]).catch(console.log);
			return results;
	}
		async getFilmComments(filmId){
		let comments = await db.query("SELECT \"kommentel.szoveg\", kommentel.ido, \"felhasznalo.nev\" FROM kommentel, felhasznalo WHERE kommentel.felhasznaloID = felhasznalo.felhasznaloId AND kommentel.filmId = $1", [filmId]);
		if(comments = null){
            return 'no comments';
        }
		return comments.rows;
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