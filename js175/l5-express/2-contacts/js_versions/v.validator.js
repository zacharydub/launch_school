//using "express-validator" module instead of manual user input validation/sanitization
//testing for uniqueness/validating multiple fields with "express-validator" is complex so that has been removed

const express = require("express");
const morgan = require("morgan");
const { body, validationResult } = require("express-validator");

const app = express();

let contactData = [
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

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.redirect("/contacts");
});

app.get("/contacts", (req, res) => {
  res.render("contacts", {
    contacts: sortContacts(contactData),
  });
});

app.get("/contacts/new", (req, res) => {
  res.render("new-contact");
});
////func used for refactoring validation code:
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
    ////refactored:
    validateName("firstName", "First"),
    validateName("lastName", "Last"),

    ////refactored above:
    // body("firstName")
    //   .trim()
    //   .isLength({ min: 1 })
    //   .withMessage("First name is required.")
    //   .bail()
    //   .isLength({ max: 25 })
    //   .withMessage("First name is too long. Maximum length is 25 characters.")
    //   .isAlpha()
    //   .withMessage("First name contains invalid characters. The name must be alphabetic."),

    // body("lastName")
    //   .trim()
    //   .isLength({ min: 1 })
    //   .withMessage("Last name is required.")
    //   .bail()
    //   .isLength({ max: 25 })
    //   .withMessage("Last name is too long. Maximum length is 25 characters.")
    //   .isAlpha()
    //   .withMessage("Last name contains invalid characters. The name must be alphabetic."),

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
);


app.listen(3000, "localhost", () => {
  console.log("Listening to port 3000.");
});