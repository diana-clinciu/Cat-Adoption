const bcrypt = require("bcrypt");
const mysql = require("mysql");

const database = mysql.createPool({
  //connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

exports.auth = (req, res) => {
  res.render("login-signup");
};

exports.register = async (req, res) => {
  const user = req.body.registerUser;
  const email = req.body.registerEmail;
  const hashedPassword = await bcrypt.hash(req.body.registerPassword, 18);

  database.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Database connected");

    connection.query(
      "SELECT * FROM USER WHERE username = ?",
      [user],
      (error, results, fields) => {
        if (error) throw error;

        if (results.length != 0) {
          console.log("username taken");
          res.status(409);
          res.render("login-signup", {
            registerMessage: "Nume de utilizator luat.",
          });
        } else {
          connection.query(
            "SELECT * FROM USER WHERE email = ?",
            [email],
            (error, results, fields) => {
              if (error) throw error;
              if (results.length != 0) {
                console.log("email taken");
                res.render("login-signup", {
                  registerMessage: "Email luat.",
                });
                res.status(409);
              } else {
                connection.query(
                  "INSERT INTO USER (username, email, password) VALUES (?, ?, ?)",
                  [user, email, hashedPassword],
                  (error, results, fields) => {
                    if (error) throw error;
                    console.log("user created");
                    res.redirect("/");
                    res.status(201);
                  }
                );
              }
            }
          );
        }
        connection.release();
        if (error) throw error;
      }
    );
  });
};

exports.login = (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  database.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Database connected");

    connection.query(
      "SELECT * FROM USER WHERE username = ?",
      [user],
      async (error, results, fields) => {
        if (error) throw error;

        if (results.length == 0) {
          console.log("wrong username");
          res.render("login-signup", {
            loginMessage: "Nume de utilizator incorect.",
          });
          res.status(404);
        } else {
          const hashedPassword = results[0].password;
          if (await bcrypt.compare(password, hashedPassword)) {
            console.log("logged in");
            req.session.loggedIn = true;
            req.session.save((err) => {
              if (err) throw err;
              res.redirect("/");
            });
            res.status(200);
          } else {
            console.log("wrong password");
            res.render("login-signup", {
              loginMessage: "Parola incorecta.",
            });
            res.status(404);
          }
        }
        connection.release();
        if (error) throw error;
      }
    );
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  console.log("logged out");
  res.redirect("/");
  res.status(200);
};
