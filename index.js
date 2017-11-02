const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');

// Initialize knex connection.
const knex = Knex({
	client: 'pg',
	useNullAsDefault: true,
	connection: {
		host: '127.0.0.1',
		user: 'akshathkumar',
		password: '',
		database: 'test_graphql_db'
	}
});

// Give the connection to objection.
Model.knex(knex);

// Create database schema. You should use knex migration files to do this. We
// create it here for simplicity.
const schemaPromise = knex.schema.createTableIfNotExists('Person', table => {
	table.increments('id').primary();
	table.string('firstName');
});

// Person model.
class Person extends Model {
	static get tableName() {
		return 'Person';
	}
}

schemaPromise.then(() => {

	// Create a person.
	return Person.query().insert({
		firstName: 'Sylvester'
	});

}).then(person => {

	console.log('created:', person.firstName, 'id:', person.id);
	// Fetch all people named Sylvester.
	return Person.query().where('firstName', 'Sylvester');

}).then(sylvesters => {

	console.log('sylvesters:', sylvesters);

});