const SeedData = require("./seed-data");
const deepCopy = require("./deep-copy");
const { sortTodoLists, sortTodos } = require("./sort");
const nextId = require("./next-id");


module.exports = class SessionPersistence {
  constructor(session) {
    //leading underscore is an advisory to users of the class that the data is for private use only. Means that _todoLists are a kind of "back door" to the session store. By referencing _todoLists, any code with access to the SessionPersistence object can update the session store. we must trust that the user won't use the private data.
    this._todoLists = session.todoLists || deepCopy(SeedData); // //checks to see whether the session store already contains data in session.todoLists. If it does, it places a reference to that data in this._todoLists. Otherwise, it makes a deep copy of the seed data to initialize both the new object and the session store 
    //deep copy of the seed data to ensure that we can't modify it for other users. If we didn't make a copy the seed data would mutate with each update made by users, and each new session would then receive the current version of that data. Instead, we want each session to get the same starter data, rather than depend on what other users have done.


    session.todoLists = this._todoLists;

    // Since we won't use the TodoList and Todo classes in SessionPersistence, we don't need to call TodoList.makeTodoList. As we explained in the previous assignment, we could continue using those classes, but that offers little benefit in this app. It would also interfere with some of the things we want to show you. Two main benefits to not using the classes: 1) It's easier to explain some application details. 2) It simplifies the changes that we must make when we move the application to a database. 
  }

  // Return the list of todo lists sorted by completion status and title (case-
  // insensitive).
  sortedTodoLists() {
    // return sortTodoLists(this._todoLists);
    // will update this to split the list of todo lists in two based on the completion status and call sortTodoLists, which we've modified to now take the two arrays as arguments
    let todoLists = deepCopy(this._todoLists);
    // let undone = todoLists.filter(todoList => !todoList.isDone());
    // let done = todoLists.filter(todoList => todoList.isDone());
    let undone = todoLists.filter(todoList => !this.isDoneTodoList(todoList));
    let done = todoLists.filter(todoList => this.isDoneTodoList(todoList));


    return sortTodoLists(undone, done);
  }

  // Are all of the todos in the todo list done? If the todo list has at least
  // one todo and all of its todos are marked as done, then the todo list is
  // done. Otherwise, it is undone.
  isDoneTodoList(todoList) {
    return todoList.todos.length > 0 && todoList.todos.every(todo => todo.done);
  }
  // Returns a copy of the todo list with the indicated ID. Returns `undefined`
  // if not found. Note that `todoListId` must be numeric.
  loadTodoList(todoListId) {
    // let todoList = this._todoLists.find(todoList => todoList.id === todoListId);
    let todoList = this._findTodoList(todoListId);
    return deepCopy(todoList);
  }

  // Does the todo list have any undone todos? Returns true if yes, false if no.
  hasUndoneTodos(todoList) {
    return todoList.todos.some(todo => !todo.done);
  }

  // Returns a copy of the list of todos in the indicated todo list by sorted by
  // completion status and title (case-insensitive).
  sortedTodos(todoList) {
    let todos = todoList.todos;
    let undone = todos.filter(todo => !todo.done);
    let done = todos.filter(todo => todo.done);
    return deepCopy(sortTodos(undone, done));
  }

  // Returns a copy of the indicated todo in the indicated todo list. Returns
  // `undefined` if either the todo list or the todo is not found. Note that
  // both IDs must be numeric.
  loadTodo(todoListId, todoId) {
    // let todoList = this.loadTodoList(todoListId);
    // if (!todoList) return undefined;
    // return todoList.todos.find(todo => todo.id === todoId);
    let todo = this._findTodo(todoListId, todoId);
    return deepCopy(todo);
  }

  // Toggle a todo between the done and not done state. Returns `true` on
  // success, `false` if the todo or todo list doesn't exist. The id arguments
  // must both be numeric.
  toggleDoneTodo(todoListId, todoId) {
    let todo = this._findTodo(todoListId, todoId);
    if (!todo) return false;

    todo.done = !todo.done;
    return true;
  }

  ////_findTodo and _findTodoList are identical to loadTodo and loadTodoList except that they return a reference to the data inside the store, not a copy. We need a reference to the todo in toggleDoneTodo since we want to update the todo; if we called loadTodo instead of _findTodo, we wouldn't be able to update the store.
  // Returns a reference to the todo list with the indicated ID. Returns
  // `undefined`. if not found. Note that `todoListId` must be numeric.
  _findTodoList(todoListId) {
    return this._todoLists.find(todoList => todoList.id === todoListId);
  }

  // Returns a reference to the indicated todo in the indicated todo list.
  // Returns `undefined` if either the todo list or the todo is not found. Note
  // that both IDs must be numeric.
  _findTodo(todoListId, todoId) {
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return undefined;

    return todoList.todos.find(todo => todo.id === todoId);
  }

  deleteTodo(todoListId, todoId) {
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return false;

    let todoIndex = todoList.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) return false;

    todoList.todos.splice(todoIndex, 1);
    return true;
  }

  // Mark all todos on the todo list as done. Returns `true` on success,
  // `false` if the todo list doesn't exist. The todo list ID must be numeric.
  completeAllTodos(todoListId) {
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return false;

    todoList.todos.filter(todo => !todo.done)
      .forEach(todo => (todo.done = true));
    return true;
  }
  // Create a new todo with the specified title and add it to the indicated todo
  // list. Returns `true` on success, `false` on failure.
  createTodo(todoListId, title) {
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return false;

    todoList.todos.push({
      title,
      id: nextId(),
      done: false,
    });
    return true;
  }
  // Delete a todo list from the list of todo lists. Returns `true` on success,
  // `false` if the todo list doesn't exist. The ID argument must be numeric.
  deleteTodoList(todoListId) {
    let todoListIndex = this._todoLists.findIndex(todoList => {
      return todoList.id === todoListId;
    });

    if (todoListIndex === -1) return false;

    this._todoLists.splice(todoListIndex, 1);
    return true;
  }
  // Set a new title for the specified todo list. Returns `true` on success,
  // `false` if the todo list isn't found. The todo list ID must be numeric.
  setTodoListTitle(todoListId, title) {
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return false;

    todoList.title = title;
    return true;
  }
  // Returns `true` if a todo list with the specified title exists in the list
  // of todo lists, `false` otherwise.
  existsTodoListTitle(title) {
    return this._todoLists.some(todoList => todoList.title === title);
  }
  // Create a new todo list with the specified title and add it to the list of
  // todo lists. Returns `true` on success, `false` on failure. (At this time,
  // there are no known failure conditions.)
  createTodoList(title) {
    this._todoLists.push({
      title,
      id: nextId(),
      todos: [],
    });

    return true;
  }
  // Returns `true` if `error` seems to indicate a `UNIQUE` constraint
  // violation, `false` otherwise.
  isUniqueConstraintViolation(_error) {
    return false;
  }

};
