//start express app
const express = require('express');
const app = express()

//log all requests
const morgan = require('morgan')
app.use(morgan("common"))

//handle requests for static assets in 'public' folder
app.use(express.static("public"));

//parse request body as URL-encoded text and store it in 'req.body' - needed for forms
app.use(express.urlencoded({ extended: false }));

//pass data from one MW to the next using 'res.locals':
app.get(
  "/foo",
  (req, res, next) => {
    res.locals.id = getNextIdNumber();
    res.locals.name = req.body.name.trim().toUpperCase();
    next();
  },
  (req, res) => {
    res.render("bar", {
      id: res.locals.id,
      name: res.locals.name,
    });
  }
)
//Data defined on res.locals has a lifetime limited to the current request/response cycle, and can, if desired, be accessed directly by view templates. For instance, in the above code, our view can access fooData even though we don't explicitly pass it to res.render. However, it's usually better to pass variables to views as the 2nd argument to res.render as we did for id and name. Use res.locals only to pass the value between middleware functions.
//you can also pass data between middleware with app.locals; it has a lifetime that corresponds to the lifetime of the application's process. That's useful when defining view helper functions and constant data. However, it's rarely helpful when data varies from one request to another.

//parameterized routes
app.get('/path/:param1/:param2', () => {
  let myParam = req.params.param1
  res.render('file-name.pug', {
    someVar: myParam,
    secondVar: req.params.param2
  })
})

//express-validator
const { body, validationResult } = require("express-validator")
const validateName = (name, whichName) => {
  return body(name)
    .trim()
    .isLength({ min: 1 })
    .withMessage(`${whichName} name is required.`)
    .bail()
    .isLength({ max: 25 })
    .withMessage(`${whichName} name is too long. Maximum length is 25 characters.`)
    .isAlpha()
    .withMessage(`${whichName} name contains invalid characters. The name must be alphabetic.`);
};

app.post("/contacts/new",
  [
    validateName("firstName", "First"),
    validateName("lastName", "Last"),

    body("phoneNumber")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Phone number is required.")
      .bail()
      .matches(/^\d\d\d-\d\d\d-\d\d\d\d$/)
      .withMessage("Invalid phone number format. Use ###-###-####."),
  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("new-contact", {
        errorMessages: errors.array().map(error => error.msg),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
      });
    } else {
      next();
    }
  },
  (req, res) => {
    contactData.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    });

    res.redirect("/contacts");
  }
)


//persistence
const session = require("express-session");
const store = require("connect-loki");
const LokiStore = store(session);

const clone = object => {
  return JSON.parse(JSON.stringify(object));
};

app.use((req, res, next) => {
  if (!("contactData" in req.session)) {
    req.session.contactData = clone(contactData);
  }

  next();
});

app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days in milliseconds
    path: "/",
    secure: false,
  },
  name: "launch-school-contacts-manager-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure",
  store: new LokiStore({}),
}));

//flash messages
const flash = require("express-flash");
app.use(flash());
//we can now define our error messages with req.flash 

//express-validator + flash
const { body, validationResult } = require("express-validator")
const validateName = (name, whichName) => {
  return body(name)
    .trim()
    .isLength({ min: 1 })
    .withMessage(`${whichName} name is required.`)
    .bail()
    .isLength({ max: 25 })
    .withMessage(`${whichName} name is too long. Maximum length is 25 characters.`)
    .isAlpha()
    .withMessage(`${whichName} name contains invalid characters. The name must be alphabetic.`);
};

app.post("/contacts/new",
  [
    validateName("firstName", "First"),
    validateName("lastName", "Last"),

    body("phoneNumber")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Phone number is required.")
      .bail()
      .matches(/^\d\d\d-\d\d\d-\d\d\d\d$/)
      .withMessage("Invalid phone number format. Use ###-###-####."),
  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      //new code involving flash:
      errors.array().forEach(error => req.flash("error", error.msg));
      // The next 2 lines are for demonstration purposes only:
      // req.flash("info", "I'm a doctor, not a bricklayer.");
      // req.flash("success", "Engage!");
      //end new code
      res.render("new-contact", {
        //next new line:
        flash: req.flash(),
        // errorMessages: errors.array().map(error => error.msg),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
      });
    } else {
      next();
    }
  },
  (req, res) => {
    req.session.contactData.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    });

    req.flash("success", "New contact added to list!");
    res.redirect("/contacts");
  }
);

//error handler
app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

//enable Pug templates in a 'views' folder
app.set("views", "./views");
app.set("view engine", "pug");

//view variables and view helpers


