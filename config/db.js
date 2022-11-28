const Pool = require("pg").Pool;

const pool = new Pool({
    //újak:
	/*user: 'doadmin',
    host: 'db-postgresql-fra1-96846-do-user-12971066-0.b.db.ondigitalocean.com',
    database: 'film',
    password: 'AVNS_0rXk4wkKmqQa6uONWpo',
    port: 25060,
    ssl: {
        rejectUnauthorized: false
    }*/
	
	//régiek:
	user: 'doadmin',
    host: 'db-postgresql-fra1-96846-do-user-12971066-0.b.db.ondigitalocean.com',
    database: 'film',
    password: 'AVNS_0rXk4wkKmqQa6uONWpo',
    port: 25060,
	ssl: {
        rejectUnauthorized: false
    }
	
});

module.exports = pool;