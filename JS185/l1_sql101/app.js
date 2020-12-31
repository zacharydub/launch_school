const { Client } = require('pg');
//const Client = require('pg').Client;

console.log("hello world")

// in order to connect to the database we need pg.Client object - can create via Client constructor
let client = new Client({ database: 'films' });

// //first run-thru:
// client.connect(); // method to connect to database
// let data = await client.query('SELECT * FROM directors')//query the database and assign a variable to the returned data
// // NOTE- no ; required at end of sql statements
// //qeuery method returns a Promise object
// console.log(data) // returns Promise object still in 'pending' state before it resolves/[rejects] to anything

//instead, make our code async
async function logQuery(queryText) {
  await client.connect();
  let data = await client.query(queryText);
  console.log('log data variable: ', data)
  // 2 useful props: rowCount and rows (array of data, where each returned row is an object in the array with column names/values as object props/values)
  //rows: [ { id: 1, name: 'John McTiernan' }, { id: 2, name: 'Michael Curtiz' },]

  // console.log('log data.rows[0]: ', data.rows[0]) // { id: 1, name: 'John McTiernan' }
  // console.log('log data.rows[0].name: ', data.rows[0].name) // John McTiernan

  //now using specific query for sidney lumet:
  // console.log(data.rows[0].title) //  12 Angry Men.
  console.log(data.rows[2].count)
  // console.log('new query duration: ', data.rows[1].duration);
  client.end(); // disconnect from the database to allow app/terminal to terminate - this method disconnects the client from the PostgreSQL server
}

// logQuery('SELECT * FROM directors');
logQuery("SELECT count(id) FROM films WHERE duration < 110 GROUP BY genre")

// logQuery("SELECT * FROM films JOIN directors ON films.director_id = directors.id WHERE name = 'Sidney Lumet'");


//NOTE: you can't connect to the database with the same pg.Client object more than once. If you call connect() on a client object after you have called end() you will receive error: "Error: Client has already been connected. You cannot reuse a client."". If you need to make multiple queries to the database during the program's operation, you need to either keep the connection open, or if it has already been closed --> instantiate a new client object to connect with