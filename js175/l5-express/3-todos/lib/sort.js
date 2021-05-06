// Compare object titles alphabetically (case-insensitive)
const compareByTitle = (itemA, itemB) => {
  let titleA = itemA.title.toLowerCase();
  let titleB = itemB.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return 0;
  }
};
const sortTodoLists = todoLists => {
  let undone = todoLists.filter(todoList => !todoList.isDone());
  let done = todoLists.filter(todoList => todoList.isDone());
  undone.sort(compareByTitle);
  done.sort(compareByTitle);
  return [].concat(undone, done);
}

// sort a list of todos
const sortTodos = todoList => {
  let undone = todoList.todos.filter(todo => !todo.isDone());
  let done = todoList.todos.filter(todo => todo.isDone());
  undone.sort(compareByTitle);
  done.sort(compareByTitle);
  return [].concat(undone, done);
}
module.exports = { sortTodoLists, sortTodos }
  // // return the list of todo lists sorted by completion status and title.
  // sortTodoLists(todoLists) {
  //   let undone = todoLists.filter(todoList => !todoList.isDone());
  //   let done = todoLists.filter(todoList => todoList.isDone());
  //   undone.sort(compareByTitle);
  //   done.sort(compareByTitle);
  //   return [].concat(undone, done);
  // },

  // // sort a list of todos
  // sortTodos(todoList) {
  //   let undone = todoList.todos.filter(todo => !todo.isDone());
  //   let done = todoList.todos.filter(todo => todo.isDone());
  //   undone.sort(compareByTitle);
  //   done.sort(compareByTitle);
  //   return [].concat(undone, done);
  // },
