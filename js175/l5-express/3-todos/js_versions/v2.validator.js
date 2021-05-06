//using express-validator to refactor the user input validation for new todo lists

const express = require("express");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
//body - used to create validators || validationResult, used to validate the results
const { body, validationResult } = require("express-validator");
const TodoList = require("./lib/todolist");

const app = express();
const host = "localhost";
const port = 3001;

// Static data for initial testing
let todoLists = require("./lib/seed-data");

app.set("views", "./views");
app.set("view engine", "pug");

// app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: "launch-school-todos-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure",
}));

app.use(flash());
// Extract session info
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

// return the list of todo lists sorted by completion status and title.
const compareByTitle = (todoListA, todoListB) => {
  let titleA = todoListA.title.toLowerCase();
  let titleB = todoListB.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return 0;
  }
};
const sortTodoLists = lists => {
  let undone = lists.filter(todoList => !todoList.isDone());
  let done = lists.filter(todoList => todoList.isDone());
  undone.sort(compareByTitle);
  done.sort(compareByTitle);
  return [].concat(undone, done);
}

app.get("/", (req, res) => {
  res.redirect("/lists");
});
// Render the list of todo lists
app.get("/lists", (req, res) => {
  res.render("lists", {
    todoLists: sortTodoLists(todoLists),
  })
})
// Render new todo list page
app.get("/lists/new", (req, res) => {
  res.render("new-list");
});
// Create a new todo list
app.post("/lists",
  ////new validation using express-validator's validation chain API
  [
    body("todoListTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("The list title is required.")
      .isLength({ max: 100 })
      .withMessage("List title must be between 1 and 100 characters.")
      //custom validator to prevent duplicate entries on the list of todo lists
      .custom(title => {
        let duplicate = todoLists.find(list => list.title === title);
        return duplicate === undefined;
      })
      .withMessage("List title must be unique."),
  ],
  //error handler - identical to previous lesson
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      res.render("new-list", {
        flash: req.flash(),
        todoListTitle: req.body.todoListTitle,
      });
    } else {
      todoLists.push(new TodoList(req.body.todoListTitle));
      req.flash("success", "The todo list has been created.");
      res.redirect("/lists");
    }
  }

  ////old manual validation
  // (req, res) => {
  //   let title = req.body.todoListTitle.trim();
  //   if (title.length === 0) {
  //     req.flash("error", "A title was not provided.");
  //     res.render("new-list", {
  //       flash: req.flash(),
  //     });
  //   } else if (title.length > 100) {
  //     req.flash("error", "List title must be between 1 and 100 characters.");
  //     res.render("new-list", {
  //       flash: req.flash(),
  //       todoListTitle: req.body.todoListTitle,
  //     });
  //   } else if (todoLists.some(list => list.title === title)) {
  //     req.flash("error", "List title must be unique.");
  //     res.render("new-list", {
  //       flash: req.flash(),
  //       todoListTitle: req.body.todoListTitle,
  //     });
  //   } else {
  //     todoLists.push(new TodoList(title));
  //     req.flash("success", "The todo list has been created.");
  //     res.redirect("/lists");
  //   }
  // }
);
// Listener
// app.listen(port, host, () => {
//   console.log(`Todos is listening on port ${port} of ${host}!`);
// });