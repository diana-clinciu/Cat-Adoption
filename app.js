const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const dotenv = require("dotenv").config();
const session = require("express-session");

const port = 8080;
const app = express();

const authRouter = require('./routes/auth');
const pagesRouter = require('./routes/pages');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  name: process.env.NAME,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 3600,
    sameSite: true
  }
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


app.use('/auth', authRouter);
app.use('/', pagesRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
