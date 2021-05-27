//using new modules: 'express-session' - used to manage sessions+cookies (we want to use different data depending based on which browser we're using/which user) and 'connect-loki' for data store for multiple users using NoSQL DB and stores it in session-store.db file
//the session-store.db should be treated as sensitive data. You should not push it to a public location, list it in .gitignore file
//The express-session module generates a unique session ID whenever a client browser makes an initial HTTP request to our application. It uses the session ID to identify that client in future requests. The app stores any data it needs to persist under the session ID and sends the session ID to the client in a cookie. After that, the browser sends this cookie back to the server as part of each subsequent request. The application can use the returned cookie to obtain the session ID and look up the stored data. This is how the session and cookie scheme allows Web applications to preserve state even though HTTP is stateless. Furthermore, the app can distinguish between multiple users (or browsers in our simplified model).

const express = require("express");
const morgan = require("morgan");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const store = require("connect-loki"); // alternatively, //express-session provides a default data store called MemoryStore, which is usually all you need during development. However, it doesn't persist data across restarts of the application or browser restarts. It is intended for development only.

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

//handy snippet to clone objects that don't have any methods or prototype data
const clone = object => {
  return JSON.parse(JSON.stringify(object));
};

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(session({
  cookie: {
    httpOnly: true,//should usually be true with sensitive cookies, such as one that contains the session ID.
    maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days in milliseconds. If not specified, the cookie's lifetime is only as long as the browser continues to run
    path: "/", //specifies the document location for the cookie. The browser sends a cookie to the server only when the URL it needs to request matches this path
    secure: false, // if true, the browser should only transmit the cookie over secure HTTPS connections. When false, the browser can send the cookie over both HTTPS and HTTP connections.
  },
  name: "launch-school-contacts-manager-session-id",//optional but you should always provide one and should be unique on the hosting server
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure", //required and used to sign and encrypt the session cookie to prevent tampering.In most applications, you should obtain the secret value from an external source that is only available to your servers, such as a database or a local file.
  store: new LokiStore({}), //defines the data store that express-session should use. It's an object of the store type we're using: in this case, LokiStore

  //should always provide the remaining two properties, resave and saveUninitialized. They both have default values, but the defaults are in the process of being changed. In most cases, you can set them to false and true, respectively. See the express-session documentation for more information.

}));


app.use((req, res, next) => {
  if (!("contactData" in req.session)) {
    req.session.contactData = clone(contactData);//we clone the data rather than using a reference. If we used a reference, each session would still be using the original object.
    //Most applications would initialize req.session.contactData from a database or file or initialize it as an empty array or object. For convenience, we use the internal contactData object to initialize the store.
  }

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
    req.session.contactData.push({
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


//now we can open the application in two (or more) different browsers. Add some contacts in one browser, then refresh the contact list in the other browser. The contact list in the other browser shouldn't show any changes. Now, add a new contact with the other browser, then go back to the first. Again, you won't see any duplication. The app now works with separate sessions, thanks to the data store.Now, try shutting down both browsers, then restart them. You should see each new contact only in the browser that you used to create it. That means you now have persistent sessions.

//The above test assumes that your browsers aren't configured to delete cookies when you shut them down. If your browser deletes cookies, you'll lose your sessions when you restart the browsers.
//Finally, control-C out of the contacts.js app and restart it (or enter the rs command in the running app in the terminal). Again, you should see that your data is still there despite the restart of the software.

//we now have a multi-user app with independent data stores for each user
