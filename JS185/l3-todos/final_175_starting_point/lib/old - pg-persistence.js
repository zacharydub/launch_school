// const SeedData = require("./seed-data");
// const deepCopy = require("./deep-copy");
// const { sortTodoLists, sortTodos } = require("./sort");
// const nextId = require("./next-id");

//removing now that we have a db-query module
// const { Client } = require("pg");
const { dbQuery } = require("./db-query");
const bcrypt = require("bcrypt");


module.exports = class PgPersistence {
  // constructor(session) {
  // }

  ////test code:
  // async testQuery1() {
  //   const SQL = "SELECT * FROM todolists";

  //   //removing now that we have a db-query module
  //   // let client = new Client({ database: "todo-lists" });
  //   // await client.connect();
  //   // let result = await client.query(SQL);
  //   // console.log("query1", result.rows);
  //   // await client.end();
  //   let result = await dbQuery(SQL);
  //   console.log("query1", result.rows);
  // }

  // async testQuery2() {
  //   const SQL = "SELECT * FROM todos";

  //   // let client = new Client({ database: "todo-lists" });
  //   // await client.connect();
  //   // let result = await client.query(SQL);
  //   // console.log("query2", result.rows);
  //   // await client.end();
  //   let result = await dbQuery(SQL);
  //   console.log("query2", result.rows);
  // }
  // //use dbQuery func to run parameterized queries 
  // async testQuery3(title) {

  //   //unsafe way to paramterize queries:
  //   // const SQL = `SELECT * FROM todolists WHERE title = '${title}'`;
  //   // let result = await dbQuery(SQL);

  //   //safe way:
  //   const SQL = "SELECT * FROM todolists WHERE title = $1";
  //   let result = await dbQuery(SQL, title);
  //   console.log("query3", result.rows);
  // }





  // Return the list of todo lists sorted by completion status and title (case-
  // insensitive).
  // sortedTodoLists() {}

  // Returns a promise that resolves to a sorted list of all the todo lists together with their todos. The list is sorted by completion status and title (case-insensitive). The todos in the list are unsorted.
  async sortedTodoLists() {
    const ALL_TODOLISTS = "SELECT * FROM todolists ORDER BY lower(title) ASC";
    const FIND_TODOS = "SELECT * FROM todos WHERE todolist_id = $1";

    let result = await dbQuery(ALL_TODOLISTS);
    let todoLists = result.rows;

    for (let index = 0; index < todoLists.length; ++index) {
      let todoList = todoLists[index];
      let todos = await dbQuery(FIND_TODOS, todoList.id);
      todoList.todos = todos.rows;
    }

    return this._partitionTodoLists(todoLists);
  }


  // Returns a new list of todo lists partitioned by completion status.
  _partitionTodoLists(todoLists) {
    let undone = [];
    let done = [];

    todoLists.forEach(todoList => {
      if (this.isDoneTodoList(todoList)) {
        done.push(todoList);
      } else {
        undone.push(todoList);
      }
    });

    return undone.concat(done);
  }


  // Are all of the todos in the todo list done? If the todo list has at least
  // one todo and all of its todos are marked as done, then the todo list is
  // done. Otherwise, it is undone.
  isDoneTodoList(todoList) {
    return todoList.todos.length > 0 && todoList.todos.every(todo => todo.done);
  }

  // Returns a copy of the todo list with the indicated ID. Returns `undefined`
  // if not found. Note that `todoListId` must be numeric.
  // loadTodoList(todoListId) {
  // }
  // Returns a promise that resolves to the todo list with the specified ID. The
  // todo list contains the todos for that list. The todos are not sorted. The
  // Promise resolves to `undefined` if the todo list is not found.
  async loadTodoList(todoListId) {
    const FIND_TODOLIST = "SELECT * FROM todolists WHERE id = $1";
    const FIND_TODOS = "SELECT * FROM todos WHERE todolist_id = $1";

    let resultTodoList = dbQuery(FIND_TODOLIST, todoListId);
    let resultTodos = dbQuery(FIND_TODOS, todoListId);
    let resultBoth = await Promise.all([resultTodoList, resultTodos]);

    let todoList = resultBoth[0].rows[0];
    if (!todoList) return undefined;

    todoList.todos = resultBoth[1].rows;
    return todoList;
  }


  // Does the todo list have any undone todos? Returns true if yes, false if no.
  // hasUndoneTodos(todoList) {
  // }
  // Does the todo list have any undone todos? Returns true if yes, false if no.
  hasUndoneTodos(todoList) {
    return todoList.todos.some(todo => !todo.done);
  }

  // Returns a copy of the list of todos in the indicated todo list by sorted by
  // completion status and title (case-insensitive).
  // sortedTodos(todoList) {
  // }
  // Returns a promise that resolves to a sorted list of all the todos in the
  // specified todo list. The list is sorted by completion status and title
  // (case-insensitive).
  async sortedTodos(todoList) {
    const SORTED_TODOS = "SELECT * FROM todos" +
      "  WHERE todolist_id = $1" +
      "  ORDER BY done ASC, lower(title) ASC";

    let result = await dbQuery(SORTED_TODOS, todoList.id);
    return result.rows;
  }


  // Returns a copy of the indicated todo in the indicated todo list. Returns
  // `undefined` if either the todo list or the todo is not found. Note that
  // both IDs must be numeric.
  // loadTodo(todoListId, todoId) {
  // }
  // Returns a copy of the indicated todo in the indicated todo list. Returns
  // `undefined` if either the todo list or the todo is not found. Note that
  // both IDs must be numeric.
  async loadTodo(todoListId, todoId) {
    const FIND_TODO = "SELECT * FROM todos WHERE todolist_id = $1 AND id = $2";

    let result = await dbQuery(FIND_TODO, todoListId, todoId);
    return result.rows[0];
  }


  // Toggle a todo between the done and not done state. Returns `true` on
  // success, `false` if the todo or todo list doesn't exist. The id arguments
  // must both be numeric.
  // toggleDoneTodo(todoListId, todoId) {
  // }

  // Toggle a todo between the done and not done state. Returns a promise that
  // resolves to `true` on success, `false` if the todo list or todo doesn't
  // exist. The id arguments must both be numeric.
  async toggleDoneTodo(todoListId, todoId) {
    const TOGGLE_DONE = "UPDATE todos SET done = NOT done" +
      "  WHERE todolist_id = $1 AND id = $2";

    let result = await dbQuery(TOGGLE_DONE, todoListId, todoId);
    return result.rowCount > 0;
  }


  ////_findTodo and _findTodoList are identical to loadTodo and loadTodoList except that they return a reference to the data inside the store, not a copy. We need a reference to the todo in toggleDoneTodo since we want to update the todo; if we called loadTodo instead of _findTodo, we wouldn't be able to update the store.
  // Returns a reference to the todo list with the indicated ID. Returns
  // `undefined`. if not found. Note that `todoListId` must be numeric.
  // _findTodoList(todoListId) {
  // }

  // Returns a reference to the indicated todo in the indicated todo list.
  // Returns `undefined` if either the todo list or the todo is not found. Note
  // that both IDs must be numeric.
  // _findTodo(todoListId, todoId) {
  // }

  // deleteTodo(todoListId, todoId) {
  // }
  // Delete a todo from the specified todo list. Returns a promise that resolves
  // to `true` on success, `false` on failure.
  async deleteTodo(todoListId, todoId) {
    const DELETE_TODO = "DELETE FROM todos WHERE todolist_id = $1 AND id = $2";

    let result = await dbQuery(DELETE_TODO, todoListId, todoId);
    return result.rowCount > 0;
  }


  // Mark all todos on the todo list as done. Returns `true` on success,
  // `false` if the todo list doesn't exist. The todo list ID must be numeric.
  // completeAllTodos(todoListId) {
  // }
  // Mark all todos in the specified todo list as done. Returns a promise that
  // resolves to `true` on success, `false` if the todo list doesn't exist. The
  // todo list ID must be numeric.
  async completeAllTodos(todoListId) {
    const COMPLETE_ALL = "UPDATE todos SET done = TRUE" +
      "  WHERE todolist_id = $1 AND NOT done";

    let result = await dbQuery(COMPLETE_ALL, todoListId);
    return result.rowCount > 0;
  }


  // Create a new todo with the specified title and add it to the indicated todo
  // list. Returns `true` on success, `false` on failure.
  //   createTodo(todoListId, title) {
  // }
  // Create a new todo with the specified title and add it to the indicated todo
  // list. Returns a promise that resolves to `true` on success, `false` on
  // failure.
  async createTodo(todoListId, title) {
    const CREATE_TODO = "INSERT INTO todos" +
      "  (title, todolist_id)" +
      "  VALUES ($1, $2)";

    let result = await dbQuery(CREATE_TODO, title, todoListId);
    return result.rowCount > 0;
  }


  // Delete a todo list from the list of todo lists. Returns `true` on success,
  // `false` if the todo list doesn't exist. The ID argument must be numeric.
  // deleteTodoList(todoListId) {
  // }
  // Delete a todo list and all of its todos (handled by cascade). Returns a
  // Promise that resolves to `true` on success, false if the todo list doesn't
  // exist.
  async deleteTodoList(todoListId) {
    const DELETE_TODOLIST = "DELETE FROM todolists WHERE id = $1";

    let result = await dbQuery(DELETE_TODOLIST, todoListId);
    return result.rowCount > 0;
  }

  // Set a new title for the specified todo list. Returns `true` on success,`false` if the todo list isn't found. The todo list ID must be numeric.
  // setTodoListTitle(todoListId, title) {
  // Returns `true` if a todo list with the specified title exists in the list of todo lists, `false` otherwise.
  // existsTodoListTitle(title) {
  // Returns a Promise that resolves to `true` if a todo list with the specified
  // title exists in the list of todo lists, `false` otherwise.
  async existsTodoListTitle(title) {
    const FIND_TODOLIST = "SELECT null FROM todolists WHERE title = $1";

    let result = await dbQuery(FIND_TODOLIST, title);
    return result.rowCount > 0;
  }
  // Set a new title for the specified todo list. Returns a promise that
  // resolves to `true` on success, `false` if the todo list wasn't found.
  async setTodoListTitle(todoListId, title) {
    const UPDATE_TITLE = "UPDATE todolists SET title = $1 WHERE id = $2";

    let result = await dbQuery(UPDATE_TITLE, title, todoListId);
    return result.rowCount > 0;
  }


  // Create a new todo list with the specified title and add it to the list of todo lists. Returns `true` on success, `false` on failure. (At this time, there are no known failure conditions.)
  // createTodoList(title) {}
  // Create a new todo list with the specified title and add it to the list of
  // todo lists. Returns a Promise that resolves to `true` on success, `false`
  // if the todo list already exists.
  async createTodoList(title) {
    const CREATE_TODOLIST = "INSERT INTO todolists (title) VALUES ($1)";

    try {
      let result = await dbQuery(CREATE_TODOLIST, title);
      return result.rowCount > 0;
    } catch (error) {
      if (this.isUniqueConstraintViolation(error)) return false;
      throw error;
    }
  }



  // Returns `true` if `error` seems to indicate a `UNIQUE` constraint
  // violation, `false` otherwise.
  isUniqueConstraintViolation(error) {
    return /duplicate key value violates unique constraint/.test(String(error));
  }

  // Returns a Promise that resolves to `true` if `username` and `password`
  // combine to identify a legitimate application user, `false` if either the
  // `username` or `password` is invalid.
  async authenticate(username, password) {
    //removing this starter content now that we're using bcrypt
    // const AUTHENTICATE = "SELECT null FROM users" +
    //   "  WHERE username = $1" +
    //   "    AND password = $2";

    // let result = await dbQuery(AUTHENTICATE, username, password);
    // return result.rowCount > 0;

    const FIND_HASHED_PASSWORD = "SELECT password FROM users" +
      "  WHERE username = $1";

    let result = await dbQuery(FIND_HASHED_PASSWORD, username);
    if (result.rowCount === 0) return false;

    return bcrypt.compare(password, result.rows[0].password);
  }


};
