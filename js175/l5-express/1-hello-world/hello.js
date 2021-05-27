const express = require('express');
const app = express();
//In this code, we first require the express module and assign it to the express constant. The value returned by require("express") is a function that we must call to create an application object. The application object is conventionally named app
const morgan = require('morgan')

const COUNTRY_DATA = [
  {
    path: "/english",
    flag: "usflag.png",
    alt: "US Flag",
    title: "Go to US English site",
  },
  {
    path: "/french",
    flag: "franceflag.png",
    alt: "Drapeau de la france",
    title: "Aller sur le site français",
  },
  {
    path: "/serbian",
    flag: "serbiaflag.png",
    alt: "Застава Србије",
    title: "Идите на српски сајт",
  },
  {
    path: "/hebrew",
    flag: "israelflag.png",
    alt: "Israeli Flag",
    title: "Go to Israel Hebrew site",
  },
]

const LANGUAGE_CODES = {
  english: "en-US",
  french: "fr-FR",
  serbian: "sr-Cryl-rs",
  hebrew: "he-IL"
};

app.set("views", "./views"); // tells Express that it should look for view templates in the views directory of the project folder. We should create that directory now:
app.set("view engine", "pug"); //Express still uses Jade as its default templating engine. You must request Pug specifically if you don't want to use Jade.

//MW functions are called in the same order that the application executes the definitions
app.use(express.static("public")); //this MW tells our application where to look for static assets: in the public directory. Then we tell Express about the MW by passing it to app.use. Express then calls this function each time it receives an HTTP request.
app.use(morgan("common"))//log data useful in debugging, and  helpful in production code for statistical purposes, security audits, and more. Good practice to always use morgan or a similar logging mechanism


app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? "current" : "";
};

//original logging function before importing 'morgan' module
// const writeLog = (req, res) => {
//   let timeStamp = String(new Date()).substring(4, 24); // Mmm dd YYYY HH:MM:SS
//   console.log(`${timeStamp}\n ${req.method}\n ${req.originalUrl} \n${res.statusCode}`);
// };

////original routes for / and /english
// app.get('/', (req, res) => {
//   res.render('hello-world-english');
// })
// app.get("/english", (req, res) => {
//   res.render("hello-world-english");
// });



////refactored routes for / and /english using a separate function:
// const showEnglishView = (req, res) => {
//   res.render("hello-world-english");
// };
// app.get("/", showEnglishView);
// app.get("/english", showEnglishView);

//// refactoring using redirection , AKA rerouting from "/" to "/english":
app.get("/", (req, res) => {
  //this callback is sometimes called a route controller or route handler, that get calls when it receives an HTTP request. By convention, many Express programs use the req and res names for the objects to access and manipulate the request and response.
  //The path passed to a route is frequently called a path pattern

  res.redirect("/english");
  // writeLog(req, res);

});
////old routes before parameterizing
// app.get("/english", (req, res) => {
//   res.render("hello-world-english", { countries: COUNTRY_DATA, currentPath: req.path, language: "en-US", });
//   // writeLog(req, res);
// });
// app.get("/french", (req, res) => {
//   res.render("hello-world-french", { countries: COUNTRY_DATA, currentPath: req.path, language: "fr-FR", });
//   // writeLog(req, res);
// });


app.get("/:language", (req, res, next) => {
  const language = req.params.language;
  const languageCode = LANGUAGE_CODES[language];
  if (!languageCode) {
    // res.status(404).send(`Language not supported: ${language}`);
    next(new Error(`Language not supported: ${language}`)); // error handlers are the other way to handle errors
  } else {
    res.render(`hello-world-${language}`, {
      //res.render instead of res.send. This new method renders the view template file hello-world-english.pug by converting it to HTML and sending it to the client; typically, that's your browser.
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: languageCode,
    });
  }
});

//Error handlers must be the last middleware in your application, and must have 4 parameters, even if the handler doesn't use them all:
app.use((err, req, res, _next) => {
  console.log(err);//console.log may write more extensive information to the console log than send would write to your browser. The additional information (usually in the form of a stack trace) is invaluable to the developer, but a security risk in a user's browser. Thus, we send an abbreviated message to the browser, but log more detailed information on the server.
  res.status(404).send(err.message);
});

app.listen(3000, 'localhost', () => {// This method tells your application to start listening for HTTP requests on the port given by the first argument (3000). The second argument tells the app to only listen for connections from the localhost (your computer). If you omit this argument, the application can accept connections from anywhere on the Internet that can reach your system. Listening for all connections from anywhere is not a good idea until you become much more familiar with security practices for Web applications. The final argument is a callback function that listen calls when it is ready to start processing requests.
  console.log('listening on 3000');
})
