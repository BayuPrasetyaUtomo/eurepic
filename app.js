const express = require("express");
const router = require("./routers");
const session = require("express-session");

const app = express();
const port = 7788;

// app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "cat dog",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true, maxAge: 3000 },
  })
);

app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
