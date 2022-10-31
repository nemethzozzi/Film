const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const app = express();
//const routeDog = require('./routes/route-dogs');
const routeUser = require('./routes/route-users');
const PORT  = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
//app.use(routeDog);
app.use(routeUser);

app.listen(PORT, () => {
  console.log("App listening at: http://localhost:8080/");
});