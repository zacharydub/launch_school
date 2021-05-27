//using new modules: 'express-flash' to handle flash messages for error redirects and other situational messages (i.e. success, debugging, warning). express-flash uses express-session to persist multiple messages over multiple request/response cycles.

//The error handling in our application is simple but effective. When we need to show an error message to the user, we merely pass an array of error messages to the view and display that array. However, that only works when using res.render to render the view; it doesn't work as well when you use res.redirect. The error messages won't be available after the redirect unless you store them in the session data. That makes them persistent so you can use them after the redirect.However, aren't we supposed to use res.render for errors? Why worry about res.redirect? Truthfully, most errors can be handled by res.render, but sometimes we have to redirect the user to a completely different page. We can use res.render to display those pages, but the user's browser won't show the correct URL. Furthermore, we may want to display other situational messages, such as a success message (e.g., "New contact created!") after performing some action. We might also want to display debugging messages, warnings, or informational messages that have nothing to do with success or failure.
//A great way to deal with these problems is to use flash messages. Flash messages get rendered once, then go away the next time the browser makes a new request. The page can display multiple flash messages of different types, each with a different appearance.


const express = require("express");
const morgan = require("morgan");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const store = require("connect-loki");
const flash = require("express-flash");

const app = express();
const LokiStore = store(session)

const contactData = [
  {
    firstName: "Mike",
    lastName: "Jones",
    phoneNumber: "281-330-8004",
  },
  {
    firstName: "Jenny",
    lastName: "Keys",
    phoneNumber: "768-867-5309",
  },
  {
    firstName: "Max",
    lastName: "Entiger",
    phoneNumber: "214-748-3647",
  },
  {
    firstName: "Alicia",
    lastName: "Keys",
    phoneNumber: "515-489-4608",
  },
];

const sortContacts = contacts => {
  return contacts.slice().sort((contactA, contactB) => {
    if (contactA.lastName < contactB.lastName) {
      return -1;
    } else if (contactA.lastName > contactB.lastName) {
      return 1;
    } else if (contactA.firstName < contactB.firstName) {
      return -1;
    } else if (contactA.firstName > contactB.firstName) {
      return 1;
    } else {
      return 0;
    }
  });
};

const clone = object => {
  return JSON.parse(JSON.stringify(object));
};

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));//tell Express to expect form data in URL-encoded format so that it can be parsed and stored in req/body...then we can access the data as props (according to HTML 'name' attribute) on req.body
app.use(morgan("common"));
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
app.use(flash());
app.use((req, res, next) => {
  if (!("contactData" in req.session)) {
    req.session.contactData = clone(contactData);
  }

  next();
});

app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/contacts");
});

app.get("/contacts", (req, res) => {
  res.render("contacts", {
    contacts: sortContacts(req.session.contactData),
  });
});

app.get("/contacts/new", (req, res) => {
  res.render("new-contact");
});


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
      //new code:
      errors.array().forEach(error => req.flash("error", error.msg));
      // The next 2 lines are for demonstration purposes only:
      // req.flash("info", "I'm a doctor, not a bricklayer.");
      // req.flash("success", "Engage!");
      //end new code
      // console.log('msg prop: ', errors.errors[0].msg)
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





app.listen(3000, "localhost", () => {
  console.log("Listening to port 3000.");
});
