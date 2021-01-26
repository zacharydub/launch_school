const express = require("express");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const { body, validationResult } = require("express-validator");
// const TodoList = require("./lib/todolist");
// const Todo = require("./lib/todo");
//removed sort module in favor of sortedTodoLists in the session-persistence module
// const { sortTodoLists, sortTodos } = require("./lib/sort");
const PgPersistence = require("./lib/pg-persistence");
const store = require("connect-loki");
// const SeedData = require("./lib/seed-data"); // Temporary code!
// const SessionPersistence = require("./lib/session-persistence");
const catchError = require("./lib/catch-error");
// const JSONPersistence = require("./lib/json-persistence");
// const { persistence } = require("./lib/get-config"); // you need to write this
// const Persistence = require(persistence);


const app = express();
const host = "localhost";
const port = 3000;
const LokiStore = store(session);

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days in millseconds
    path: "/",
    secure: false,
  },
  name: "launch-school-todos-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure",
  store: new LokiStore({}),
}));

app.use(flash());

////removing in favor of SessionPersistence object
// Set up persistent session data
// app.use((req, res, next) => {
//   // req.session.todoLists = SeedData; // Temporary code!
//   let todoLists = [];
//   if ("todoLists" in req.session) {
//     req.session.todoLists.forEach(todoList => {
//       todoLists.push(TodoList.makeTodoList(todoList));
//     });
//   }

//   req.session.todoLists = todoLists;
//   next();
// });
// Create a new datastore, accessed/manipulated by the SessionPersistence object
app.use((req, res, next) => {
  // res.locals.store = new SessionPersistence(req.session);
  res.locals.store = new PgPersistence(req.session);
  // res.locals.store = new JSONPersistence(req.session);
  // res.locals.store = new Persistence(req.session);
  // res.locals.store = new SessionPersistence(req.session);

  next();
});
// Temporary test code
// app.use((req, res) => {
//   res.locals.store.testQuery1();
//   res.locals.store.testQuery2();

//   res.send("quitting");
// });
// Temporary test code
// app.use(async (req, res, next) => {
//   try {
//     await res.locals.store.testQuery1();
//     await res.locals.store.testQuery2();
//     await res.locals.store.testQuery3("Home Todos");
//     await res.locals.store.testQuery3("Work Todos");
//     await res.locals.store.testQuery3("No Such Todos");
//     // Note the changes on this line.
//     const maliciousCode = "'; UPDATE todos SET done = true WHERE done <> 't";
//     await res.locals.store.testQuery3(maliciousCode);
//     res.send("quitting");
//   } catch (error) {
//     next(error);
//   }
// });



// Extract session info
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.signedIn = req.session.signedIn;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});


// Find a todo list with the indicated ID. Returns `undefined` if not found.
// Note that `todoListId` must be numeric.
// const loadTodoList = (todoListId, todoLists) => {
//   return todoLists.find(todoList => todoList.id === todoListId);
// };

// Find a todo with the indicated ID in the indicated todo list. Returns
// `undefined` if not found. Note that both `todoListId` and `todoId` must be
// numeric.
// const loadTodo = (todoListId, todoId, todoLists) => {
//   let todoList = loadTodoList(todoListId, todoLists);
//   if (!todoList) return undefined;

//   return todoList.todos.find(todo => todo.id === todoId);
// };


// Detect unauthorized access to routes.
const requiresAuthentication = (req, res, next) => {
  if (!res.locals.signedIn) {
    // console.log("Unauthorized.");
    // res.status(401).send("Unauthorized.");
    res.redirect(302, "/users/signin");
  } else {
    next();
  }
};

// Redirect start page
app.get("/", (req, res) => {
  res.redirect("/lists");
});


// Render the list of todo lists
// app.get("/lists", async (req, res) => {
//adding in new store object, then redoing again to move op logic out of lists view and here into the express app
// res.render("lists", {
//   // todoLists: sortTodoLists(req.session.todoLists)
//   todoLists: res.locals.store.sortedTodoLists(),
// });

////refactoring try/catch block using catchError MW wrapper func
// try {
//   let store = res.locals.store;
//   let todoLists = await store.sortedTodoLists();

//   let todosInfo = todoLists.map(todoList => ({
//     countAllTodos: todoList.todos.length,
//     countDoneTodos: todoList.todos.filter(todo => todo.done).length,
//     isDone: store.isDoneTodoList(todoList),
//   }));

//   res.render("lists", {
//     todoLists,
//     todosInfo,
//   });
// }
// catch (error) {
//   next(error)
// }
// });
app.get("/lists",
  requiresAuthentication,
  catchError(async (req, res) => {
    let store = res.locals.store;
    let todoLists = await store.sortedTodoLists();
    let todosInfo = todoLists.map(todoList => ({
      countAllTodos: todoList.todos.length,
      countDoneTodos: todoList.todos.filter(todo => todo.done).length,
      isDone: store.isDoneTodoList(todoList),
    }));

    res.render("lists", {
      todoLists,
      todosInfo,
    });
  })
);


// Render new todo list page
// app.get("/lists/new", (req, res) => {
//   res.render("new-list");
// });
app.get("/lists/new",
  requiresAuthentication,
  (req, res) => {
    res.render("new-list");
  }
)

// Create a new todo list
app.post("/lists",
  requiresAuthentication,//authenticate users
  [
    body("todoListTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("The list title is required.")
      .isLength({ max: 100 })
      .withMessage("List title must be between 1 and 100 characters.")
    // .custom((title, { req }) => {
    //   let todoLists = req.session.todoLists;
    //   let duplicate = todoLists.find(list => list.title === title);
    //   return duplicate === undefined;
    // })
    // .withMessage("List title must be unique."),
  ],
  // (req, res) => {
  //   let errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     errors.array().forEach(message => req.flash("error", message.msg));
  //     res.render("new-list", {
  //       flash: req.flash(),
  //       todoListTitle: req.body.todoListTitle,
  //     });
  //   } else {
  //     req.session.todoLists.push(new TodoList(req.body.todoListTitle));
  //     req.flash("success", "The todo list has been created.");
  //     res.redirect("/lists");
  //   }
  // }

  // (req, res, next) => {
  //   let errors = validationResult(req);
  //   let todoListTitle = req.body.todoListTitle;

  //   const rerenderNewList = () => {
  //     res.render("new-list", {
  //       todoListTitle,
  //       flash: req.flash(),
  //     });
  //   };

  //   if (!errors.isEmpty()) {
  //     errors.array().forEach(message => req.flash("error", message.msg));
  //     rerenderNewList();
  //   } else if (res.locals.store.existsTodoListTitle(todoListTitle)) {
  //     req.flash("error", "The list title must be unique.");
  //     rerenderNewList();
  //   } else {
  //     let created = res.locals.store.createTodoList(todoListTitle);
  //     if (!created) {
  //       next(new Error("Failed to create todo list."));
  //     } else {
  //       req.flash("success", "The todo list has been created.");
  //       res.redirect("/lists");
  //     }
  //   }
  // }
  catchError(async (req, res) => {
    let errors = validationResult(req);
    let todoListTitle = req.body.todoListTitle;

    const rerenderNewList = () => {
      res.render("new-list", {
        todoListTitle,
        flash: req.flash(),
      });
    };

    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      rerenderNewList();
    } else if (await res.locals.store.existsTodoListTitle(todoListTitle)) {
      req.flash("error", "The list title must be unique.");
      rerenderNewList();
    } else {
      let created = await res.locals.store.createTodoList(todoListTitle);
      if (!created) {
        req.flash("error", "The list title must be unique.");
        rerenderNewList();
      } else {
        req.flash("success", "The todo list has been created.");
        res.redirect("/lists");
      }
    }
  })
);

// TEMPORARY CODE-DELETE WHEN DONE-used to test 'Render individual todo list and its todos' in Loading & Sorting
// app.get("/search/:todoListId", (req, res) => {
//   let todoListId = req.params.todoListId;
//   let todoList = res.locals.store.loadTodoList(+todoListId);
//   if (todoList) {
//     res.send(`Found todo list ${todoListId} with title "${todoList.title}"`);
//   } else {
//     res.send(`Did not find todo list ${todoListId}`);
//   }
// });
// TEMPORARY CODE: DELETE WHEN DONE
// app.get("/search/:todoListId/test/:todoId", (req, res) => {
//   let { todoListId, todoId } = req.params;
//   let todo = res.locals.store.loadTodo(+todoListId, +todoId);
//   if (todo) {
//     res.send(`Found todo ${todoListId}/${todoId} with title "${todo.title}"`);
//   } else {
//     res.send(`Did not find todo ${todoListId}/${todoId}`);
//   }
// });



////refactoring try/catch block to use catchError
// Render individual todo list and its todos
// app.get("/lists/:todoListId", async (req, res, next) => {
// let todoList = loadTodoList(+todoListId, req.session.todoLists);
// if (todoList === undefined) {
//   next(new Error("Not found."));
// } else {
//   res.render("list", {
//     todoList: todoList,
//     todos: sortTodos(todoList),
//   });
// }
//   try {
//     let todoListId = req.params.todoListId;
//     let todoList = await res.locals.store.loadTodoList(+todoListId);
//     if (todoList === undefined) {
//       next(new Error("Not found."));
//     } else {
//       todoList.todos = await res.locals.store.sortedTodos(todoList);
//       res.render("list", {
//         todoList,
//         // todos: sortTodos(todoList),
//         isDoneTodoList: res.locals.store.isDoneTodoList(todoList),
//         hasUndoneTodos: res.locals.store.hasUndoneTodos(todoList),
//       });
//     }
//   } catch (error) {
//     next(error)
//   }
// });

// Render individual todo list and its todos
app.get("/lists/:todoListId",
  requiresAuthentication,
  catchError(async (req, res) => {
    let todoListId = req.params.todoListId;
    let todoList = await res.locals.store.loadTodoList(+todoListId);
    if (todoList === undefined) throw new Error("Not found.");

    todoList.todos = await res.locals.store.sortedTodos(todoList);

    res.render("list", {
      todoList,
      isDoneTodoList: res.locals.store.isDoneTodoList(todoList),
      hasUndoneTodos: res.locals.store.hasUndoneTodos(todoList),
    });
  })
);

// Toggle completion status of a todo
// app.post("/lists/:todoListId/todos/:todoId/toggle", (req, res, next) => {
// let { todoListId, todoId } = req.params;
// let todo = res.locals.store.loadTodo(+todoListId, +todoId, req.session.todoLists);
// if (!todo) {
//   next(new Error("Not found."));
// } else {
//   let title = todo.title;
//   if ('wtvr') {
//     // todo.markUndone();
//     req.flash("success", `"${title}" marked as NOT done!`);
//   } else {
//     // todo.markDone();
//     req.flash("success", `"${title}" marked done.`);
//   }
//   res.redirect(`/lists/${todoListId}`);
// })
// Toggle completion status of a todo
// app.post("/lists/:todoListId/todos/:todoId/toggle", (req, res, next) => {
//   let { todoListId, todoId } = req.params;
//   let toggled = res.locals.store.toggleDoneTodo(+todoListId, +todoId);
//   if (!toggled) {
//     next(new Error("Not found."));
//   } else {
//     let todo = res.locals.store.loadTodo(+todoListId, +todoId);
//     if (todo.done) {
//       req.flash("success", `"${todo.title}" marked done.`);
//     } else {
//       req.flash("success", `"${todo.title}" marked as NOT done!`);
//     }

//     res.redirect(`/lists/${todoListId}`);
//   }
// });
// Toggle completion status of a todo
app.post("/lists/:todoListId/todos/:todoId/toggle",
  requiresAuthentication,
  catchError(async (req, res) => {
    let { todoListId, todoId } = req.params;
    let toggled = await res.locals.store.toggleDoneTodo(+todoListId, +todoId);
    if (!toggled) throw new Error("Not found.");

    let todo = await res.locals.store.loadTodo(+todoListId, +todoId);
    if (todo.done) {
      req.flash("success", `"${todo.title}" marked done.`);
    } else {
      req.flash("success", `"${todo.title}" marked as NOT done!`);
    }

    res.redirect(`/lists/${todoListId}`);
  })
);



// Delete a todo
// app.post("/lists/:todoListId/todos/:todoId/destroy", (req, res, next) => {
// let { todoListId, todoId } = { ...req.params };
// // let todoList = loadTodoList(+todoListId, req.session.todoLists);
// // if (!todoList) {
// //   next(new Error("Not found."));
// // } else {
// //   // let todo = loadTodo(+todoListId, +todoId, req.session.todoLists);
// //
// let todo = res.locals.store.deleteTodo(+todoListId, +todoId)
// if (!todo) {
//   next(new Error("Not found."));
// } else {
//   // todoList.removeAt(todoList.findIndexOf(todo));
//   req.flash("success", "The todo has been deleted.");
//   res.redirect(`/lists/${todoListId}`);
// }
// });
// Delete a todo
app.post("/lists/:todoListId/todos/:todoId/destroy",
  requiresAuthentication,
  catchError(async (req, res) => {
    let { todoListId, todoId } = req.params;
    let deleted = await res.locals.store.deleteTodo(+todoListId, +todoId);
    if (!deleted) throw new Error("Not found.");

    req.flash("success", "The todo has been deleted.");
    res.redirect(`/lists/${todoListId}`);
  })
);


// Mark all todos as done
// app.post("/lists/:todoListId/complete_all", (req, res, next) => {
//   let todoListId = req.params.todoListId;

//   // let todoList = loadTodoList(+todoListId, req.session.todoLists);
//   // if (!todoList) {
//   //   next(new Error("Not found."));
//   // } else {
//   //   todoList.markAllDone();
//   if (!res.locals.store.completeAllTodos(+todoListId)) {
//     next(new Error("Not found."));
//   } else {
//     req.flash("success", "All todos have been marked as done.");
//     res.redirect(`/lists/${todoListId}`);
//   }
// });
// Mark all todos as done
app.post("/lists/:todoListId/complete_all",
  requiresAuthentication,
  catchError(async (req, res) => {
    let todoListId = req.params.todoListId;
    let completed = await res.locals.store.completeAllTodos(+todoListId);
    if (!completed) throw new Error("Not found.");

    req.flash("success", "All todos have been marked as done.");
    res.redirect(`/lists/${todoListId}`);
  })
);

// // Create a new todo and add it to the specified list
// app.post("/lists/:todoListId/todos",
//   [
//     body("todoTitle")
//       .trim()
//       .isLength({ min: 1 })
//       .withMessage("The todo title is required.")
//       .isLength({ max: 100 })
//       .withMessage("Todo title must be between 1 and 100 characters."),
//   ],
//   (req, res, next) => {
//     let todoListId = req.params.todoListId;
//     // let todoList = loadTodoList(+todoListId, req.session.todoLists);
//     let todoList = res.locals.store.loadTodoList(+todoListId);
//     let todoTitle = req.body.todoTitle;
//     if (!todoList) {
//       next(new Error("Not found."));
//     } else {
//       let errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         errors.array().forEach(message => req.flash("error", message.msg));

//         //   res.render("list", {
//         //     flash: req.flash(),
//         //     todoList: todoList,
//         //     todos: sortTodos(todoList),
//         //     todoTitle: req.body.todoTitle,
//         //   });
//         // } else {
//         //   let todo = new Todo(req.body.todoTitle);
//         //   todoList.add(todo);
//         //   req.flash("success", "The todo has been created.");
//         //   res.redirect(`/lists/${todoListId}`);
//         // }
//         todoList.todos = res.locals.store.sortedTodos(todoList);

//         res.render("list", {
//           todoList,
//           isDoneTodoList: res.locals.store.isDoneTodoList(todoList),
//           hasUndoneTodos: res.locals.store.hasUndoneTodos(todoList),
//           todoTitle,
//           flash: req.flash(),
//         });
//       } else {
//         let created = res.locals.store.createTodo(+todoListId, todoTitle);
//         if (!created) {
//           next(new Error("Not found."));
//         } else {
//           req.flash("success", "The todo has been created.");
//           res.redirect(`/lists/${todoListId}`);
//         }
//       }
//     }
//   }
// );
// Create a new todo and add it to the specified list
app.post("/lists/:todoListId/todos",
  requiresAuthentication,
  [
    body("todoTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("The todo title is required.")
      .isLength({ max: 100 })
      .withMessage("Todo title must be between 1 and 100 characters."),
  ],
  catchError(async (req, res) => {
    let todoTitle = req.body.todoTitle;
    let todoListId = req.params.todoListId;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));

      let todoList = await res.locals.store.loadTodoList(+todoListId);
      if (!todoList) throw new Error("Not found.");

      todoList.todos = await res.locals.store.sortedTodos(todoList);

      res.render("list", {
        todoList,
        todoTitle,
        isDoneTodoList: res.locals.store.isDoneTodoList(todoList),
        hasUndoneTodos: res.locals.store.hasUndoneTodos(todoList),
        flash: req.flash(),
      });
    } else {
      let created = await res.locals.store.createTodo(+todoListId, todoTitle);
      if (!created) throw new Error("Not found.");

      req.flash("success", "The todo has been created.");
      res.redirect(`/lists/${todoListId}`);
    }
  })
)

// Render edit todo list form
// app.get("/lists/:todoListId/edit", (req, res, next) => {
//   let todoListId = req.params.todoListId;
//   // let todoList = loadTodoList(+todoListId, req.session.todoLists);
//   let todoList = res.locals.store.loadTodoList(+todoListId, req.session.todoLists);

//   if (!todoList) {
//     next(new Error("Not found."));
//   } else {
//     res.render("edit-list", { todoList });
//   }
// });
// Render edit todo list form
app.get("/lists/:todoListId/edit",
  requiresAuthentication,
  catchError(async (req, res) => {
    let todoListId = req.params.todoListId;
    let todoList = await res.locals.store.loadTodoList(+todoListId);
    if (!todoList) throw new Error("Not found.");

    res.render("edit-list", { todoList });
  })
);

// Delete todo list
// app.post("/lists/:todoListId/destroy", (req, res, next) => {
//   let todoListId = +req.params.todoListId;
//   // let todoLists = req.session.todoLists;
//   // let index = todoLists.findIndex(todoList => todoList.id === todoListId);
//   // if (index === -1) {
//   //   next(new Error("Not found."));
//   // } else {
//   //   todoLists.splice(index, 1);

//   //   req.flash("success", "Todo list deleted.");
//   //   res.redirect("/lists");
//   // }
//   let deleted = res.locals.store.deleteTodoList(+todoListId);
//   if (!deleted) {
//     next(new Error("Not found."));
//   } else {
//     req.flash("success", "Todo list deleted.");
//     res.redirect("/lists");
//   }
// });
// Delete todo list
app.post("/lists/:todoListId/destroy",
  requiresAuthentication,
  catchError(async (req, res) => {
    let todoListId = req.params.todoListId;
    let deleted = await res.locals.store.deleteTodoList(+todoListId);
    if (!deleted) throw new Error("Not found.");

    req.flash("success", "Todo list deleted.");
    res.redirect("/lists");
  })
);


// // Edit todo list title
// app.post("/lists/:todoListId/edit",
//   [
//     body("todoListTitle")
//       .trim()
//       .isLength({ min: 1 })
//       .withMessage("The list title is required.")
//       .isLength({ max: 100 })
//       .withMessage("List title must be between 1 and 100 characters.")
//     // .custom((title, { req }) => {
//     //   let todoLists = req.session.todoLists;
//     //   let duplicate = todoLists.find(list => list.title === title);
//     //   return duplicate === undefined;
//     // })
//     // .withMessage("List title must be unique."),
//   ],
//   // (req, res, next) => {
//   //   let todoListId = req.params.todoListId;
//   //   // let todoList = loadTodoList(+todoListId, req.session.todoLists);
//   //   let todoList = res.locals.store.loadTodoList(+todoListId);

//   //   if (!todoList) {
//   //     next(new Error("Not found."));
//   //   } else {
//   //     let todoListTitle = req.body.todoListTitle;

//   //     let errors = validationResult(req);
//   //     if (!errors.isEmpty()) {
//   //       errors.array().forEach(message => req.flash("error", message.msg));

//   //       res.render("edit-list", {
//   //         flash: req.flash(),
//   //         todolist,
//   //         todoListTitle,
//   //         // todoListTitle: req.body.todoListTitle,
//   //         todoList: todoList,
//   //       });
//   //     } else {
//   //       // todoList.setTitle(req.body.todoListTitle);
//   //       if (!res.locals.store.setTodoListTitle(+todoListId, todoListTitle)) {
//   //         next(new Error("Not found."));
//   //       }
//   //       req.flash("success", "Todo list updated.");
//   //       res.redirect(`/lists/${todoListId}`);
//   //     }
//   (req, res, next) => {
//     let store = res.locals.store;
//     let todoListId = req.params.todoListId;
//     let todoListTitle = req.body.todoListTitle;

//     const rerenderEditList = () => {
//       let todoList = store.loadTodoList(+todoListId);
//       if (!todoList) {
//         next(new Error("Not found."));
//       } else {
//         res.render("edit-list", {
//           todoListTitle,
//           todoList,
//           flash: req.flash(),
//         });
//       }
//     };
//     let errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       errors.array().forEach(message => req.flash("error", message.msg));
//       rerenderEditList();
//     } else if (res.locals.store.existsTodoListTitle(todoListTitle)) {
//       req.flash("error", "The list title must be unique.");
//       rerenderEditList();
//     } else if (!res.locals.store.setTodoListTitle(+todoListId,
//       todoListTitle)) {
//       next(new Error("Not found."));
//     } else {
//       req.flash("success", "Todo list updated.");
//       res.redirect(`/lists/${todoListId}`);
//     }
//   }
// );
// Edit todo list title
app.post("/lists/:todoListId/edit",
  requiresAuthentication,
  [
    body("todoListTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("The list title is required.")
      .isLength({ max: 100 })
      .withMessage("List title must be between 1 and 100 characters.")
  ],
  catchError(async (req, res) => {
    let store = res.locals.store;
    let todoListId = req.params.todoListId;
    let todoListTitle = req.body.todoListTitle;

    const rerenderEditList = async () => {
      let todoList = await store.loadTodoList(+todoListId);
      if (!todoList) throw new Error("Not found.");

      res.render("edit-list", {
        todoListTitle,
        todoList,
        flash: req.flash(),
      });
    };

    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   errors.array().forEach(message => req.flash("error", message.msg));
    //   await rerenderEditList();
    // } else if (await store.existsTodoListTitle(todoListTitle)) {
    //   req.flash("error", "The list title must be unique.");
    //   await rerenderEditList();
    // } else {
    //   let updated = await store.setTodoListTitle(+todoListId, todoListTitle);
    //   if (!updated) throw new Error("Not found.");

    //   req.flash("success", "Todo list updated.");
    //   res.redirect(`/lists/${todoListId}`);
    // }

    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach(message => req.flash("error", message.msg));
        rerenderEditList();
      } else if (await store.existsTodoListTitle(todoListTitle)) {
        req.flash("error", "The list title must be unique.");
        rerenderEditList();
      } else {
        let updated = await store.setTodoListTitle(+todoListId, todoListTitle);
        if (!updated) throw new Error("Not found.");

        req.flash("success", "Todo list updated.");
        res.redirect(`/lists/${todoListId}`);
      }
    } catch (error) {
      // if (/duplicate key value violates unique constraint/.test(String(error))) {
      if (store.isUniqueConstraintViolation(error)) {
        req.flash("error", "The list title must be unique.");
        rerenderEditList();
      } else {
        throw error;
      }
    }

  })

)
// Render the Sign In page.
app.get("/users/signin", (req, res) => {
  req.flash("info", "Please sign in.");
  res.render("signin", {
    flash: req.flash(),
  });
});

// Handle Sign In form submission
app.post("/users/signin", async (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password;

  // if (username !== "admin" || password !== "secret") {
  let authenticated = await res.locals.store.authenticate(username, password);
  if (!authenticated) {
    req.flash("error", "Invalid credentials.");
    res.render("signin", {
      flash: req.flash(),
      username: req.body.username,
    });
  } else {
    req.session.username = username;
    req.session.signedIn = true;
    req.flash("info", "Welcome!");
    res.redirect("/lists");
  }
});
// Handle Sign Out
app.post("/users/signout", (req, res) => {
  delete req.session.username;
  delete req.session.signedIn;
  res.redirect("/users/signin");
})

// Error handler
app.use((err, req, res, _next) => {
  console.log(err); // Writes more extensive information to the console log
  res.status(404).send(err.message);
});

// Listener
app.listen(port, host, () => {
  console.log(`Todos is listening on port ${port} of ${host}!`);
});
