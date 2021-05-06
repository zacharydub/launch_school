const express = require('express');
const morgan = require('morgan')
const app = express();

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

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(morgan("common"))

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

////refactored routes for / and /english:
// const showEnglishView = (req, res) => {
//   res.render("hello-world-english");
// };
// app.get("/", showEnglishView);
// app.get("/english", showEnglishView);

////using redirect routing for / -> /english:
app.get("/", (req, res) => {
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

// app.get("/serbian", (req, res) => {
//   res.render("hello-world-serbian", { countries: COUNTRY_DATA, currentPath: req.path, language: "sr-Cyrl-rs" });
//   // writeLog(req, res);

// });
// app.get("/hebrew", (req, res) => {
//   res.render("hello-world-hebrew", { countries: COUNTRY_DATA, currentPath: req.path, language: "he-IL" })
//   // writeLog(req, res);
// })

app.get("/:language", (req, res, next) => {
  const language = req.params.language;
  const languageCode = LANGUAGE_CODES[language];
  if (!languageCode) {
    // res.status(404).send(`Language not supported: ${language}`);
    next(new Error(`Language not supported: ${language}`));
  } else {
    res.render(`hello-world-${language}`, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: languageCode,
    });
  }
});

app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

app.listen(3000, 'localhost', () => {
  console.log('listening on 3000');
})