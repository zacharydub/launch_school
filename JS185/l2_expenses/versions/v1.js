#!/usr/bin/env node

// "hash-bang" or "she-bang", and it allows a shell program to execute the script using the Node interpreter


const PROCESS = require('process'); // gives us access to the arguments passed into our CLI program via process.argv, which returns an array of arguments passed to CLI
const { Client } = require('pg'); // 
const client = new Client({
  database: 'expenses'
  // in CLI we ran: 
  // $ createdb expenses 
  // $ psql -d expenses < schema.sql
});

const HELP = `An expense recording system

Commands:

add AMOUNT MEMO [DATE] - record a new expense
clear - delete all expenses
list - list all expenses
delete NUMBER - remove expense with id NUMBER
search QUERY - list expenses with a matching memo field`

function displayHelp() {
  console.log(HELP);
};

function logAndExit(msg) {
  console.log(msg);
  process.exit()
}

async function listExpenses() {
  await client.connect().catch(err => logAndExit(err));

  let text = "SELECT * FROM expenses ORDER BY created_on ASC"

  let res = await client.query(text)
    .catch(err => logAndExit(err));

  res.rows.forEach(tuple => {
    //A tuple in database terminology can be thought of as analogous to a database record or row. With regards to the pg.Result object, each tuple represents a row object in the rows array.
    let columns = [
      `${tuple.id}`.padStart(3),
      tuple.created_on.toDateString().padStart(10),
      tuple.amount.padStart(12),
      tuple.memo
    ];

    console.log(columns.join(' | '));
  });
  await client.end().catch(err => logAndExit(err));
};

//new function:
async function addExpense(cost, memo) {
  await client.connect();
  await client.connect().catch(err => logAndExit(err));
  let date = new Date();
  date = date.toLocaleDateString();

  let text = "INSERT INTO expenses (amount, memo, created_on) VALUES ($1,$2,$3)"
  let values = [cost, memo, date]
  await client.query(text, values)

  //// new data previously inserted using interpolation
  // await client.query(`INSERT INTO expenses (amount, memo, created_on)
  // VALUES (${amount}, '${memo}', '${date}')`).catch(err => logAndExit(err));
  /////...but this is a nono - never interpolate values into SQL statements manually. Always use the appropriate database adapter parameterization syntax to ensure values are properly quoted

  let res = await client.query("SELECT * FROM expenses")
  console.log(res.rows)
  await client.end().catch(err => logAndExit(err));
}
//Because the code above is using simple string interpolation to build a SQL statement, it fails to properly insert values that contain certain characters that have a special meaning in SQL, i.e. an apostrophe.


//This is not only a serious bug in the application, but a fairly common security problem for a database-backed application. In a previous course we discussed escaping user-provided content in an HTML page. We also need to carefully handle user-provided values that are used to build SQL statements.

//If you attempt to add an expense with the memo "with the memo Gas for Karen's Car", you'll see an error, type UnhandledPromiseRejectionWarning, as currently we dont handle rejected Promises

let args = PROCESS.argv; // array of argument passed to CLI
// console.log(args) // 1st 2 array elements are always: process.execPath and the path to the file being executed . 3rd element is the argument 'list' from the command "$ ./expense list"
let command = args[2];

if (command === 'list') {
  listExpenses();
} else if (command === 'add') {
  // if (args.length === 5) {
  if (args[3] && args[4]) {
    addExpense(args[3], args[4]);
  } else {
    console.log('You must provide an amount and memo.')
  }
}
else {
  displayHelp();
}


// // previous
// async function logit() {
//   await client.connect();
//   let res = await client.query("SELECT * FROM expenses ORDER BY created_on ASC");
//   res.rows.forEach(tuple => {

//     let columns = [
//       `${tuple.id}`.padStart(3),
//       tuple.created_on.toDateString().padStart(10),
//       tuple.amount.padStart(12),
//       tuple.memo
//     ];
//     console.log(columns.join(' | '));
//   });
//   await client.end();
// }

// function help() {
//   console.log(`
//   An expense recording system

//   Commands:

//   add AMOUNT MEMO [DATE] - record a new expense
//   clear - delete all expenses
//   list - list all expenses
//   delete NUMBER - remove expense with id NUMBER
//   search QUERY - list expenses with a matching memo field
//   `)
// }
// process.argv.forEach(command => {
//   if (command === 'help') {
//     help();
//   } else if (command === 'logit') {
//     logit();
//   }
// })
