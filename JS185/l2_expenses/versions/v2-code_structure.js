#!/usr/bin / env node

'use strict'
const PROCESS = require('process');
const { Client } = require('pg');
// const client = new Client({
//   database: 'expenses'
// });

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

// async function listExpenses() {
//   await client.connect().catch(err => logAndExit(err));

//   let text = "SELECT * FROM expenses ORDER BY created_on ASC"

//   let res = await client.query(text)
//     .catch(err => logAndExit(err));

//   res.rows.forEach(tuple => {
//     let columns = [
//       `${tuple.id}`.padStart(3),
//       tuple.created_on.toDateString().padStart(10),
//       tuple.amount.padStart(12),
//       tuple.memo
//     ];

//     console.log(columns.join(' | '));
//   });
//   await client.end().catch(err => logAndExit(err));
// };

// async function addExpense(cost, memo) {
//   await client.connect();
//   await client.connect().catch(err => logAndExit(err));
//   let date = new Date();
//   date = date.toLocaleDateString();

//   let text = "INSERT INTO expenses (amount, memo, created_on) VALUES ($1,$2,$3)"
//   let values = [cost, memo, date]
//   await client.query(text, values)


//   let res = await client.query("SELECT * FROM expenses")
//   console.log(res.rows)
//   await client.end().catch(err => logAndExit(err));
// }

// let args = PROCESS.argv;
// let command = args[2];
// if (command === 'list') {
//   listExpenses();
// } else if (command === 'add') {
//   if (args[3] && args[4]) {
//     addExpense(args[3], args[4]);
//   } else {
//     console.log('You must provide an amount and memo.')
//   }
// }
// else {
//   displayHelp();
// }

class ExpenseData {
  constructor() {
    this.client = new Client({ database: 'expenses' });
  }

  async addExpense(cost, memo) {
    await client.connect();
    await client.connect().catch(err => logAndExit(err));
    let date = new Date();
    date = date.toLocaleDateString();

    let text = "INSERT INTO expenses (amount, memo, created_on) VALUES ($1,$2,$3)"
    let values = [cost, memo, date]
    await client.query(text, values)

    let res = await client.query("SELECT * FROM expenses")
    console.log(res.rows)
    await client.end().catch(err => logAndExit(err));
  }

  async listExpenses() {
    await client.connect().catch(err => logAndExit(err));

    let text = "SELECT * FROM expenses ORDER BY created_on ASC"

    let res = await client.query(text)
      .catch(err => logAndExit(err));

    res.rows.forEach(tuple => {
      let columns = [
        `${tuple.id}`.padStart(3),
        tuple.created_on.toDateString().padStart(10),
        tuple.amount.padStart(12),
        tuple.memo
      ];

      console.log(columns.join(' | '));
    });
    await client.end().catch(err => logAndExit(err));
  }
}

class CLI {
  constructor() {
    this.app = new ExpenseData()
  }
  static HELP() {
    return `An expense recording system

    Commands:
    
    add AMOUNT MEMO [DATE] - record a new expense
    clear - delete all expenses
    list - list all expenses
    delete NUMBER - remove expense with id NUMBER
    search QUERY - list expenses with a matching memo field`
  }
  displayHelp() {
    console.log(CLI.HELP())
  }
  run(args) {
    let command = args[2];
    if (command === 'list') {
      this.app.listExpenses();
    } else if (command === 'add') {
      let amount = args[3];
      let memo = args[4];
      if (amount && memo) {
        this.app.addExpense(amount, memo);
      } else {
        console.log('You must provide an amount and memo.')
      }
    }
    else {
      displayHelp();
    }
  }
}

let cli = new CLI()
cli.run(PROCESS.argv)
