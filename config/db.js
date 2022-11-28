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
	user: 'eisebavoesxwhl',
    host: 'ec2-54-76-43-89.eu-west-1.compute.amazonaws.com',
    database: 'd4c6fa70e6ag0v',
    password: '9bd35dd001a022996f482f944df1283dcead71b52485a2be7b0c63508cbc3d6f',
    port: 5432,
	ssl: {
        rejectUnauthorized: false
    }
	
});

module.exports = pool;