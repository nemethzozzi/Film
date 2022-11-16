const express = require("express");
const sessions = require("express-session");
const path = require("path");
const { Pool } = require("pg");
const app = express();
const routeUser = require('./routes/route-users');
const PORT  = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const routeMyUser = require('./routes/route-myUsers');
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(routeUser);
app.use(routeMyUser);

app.use(sessions({
  secret:'asasds*(&^*(',
  resave:false,
  saveUninitialized:true
}));
//form-ok és method = POST miatt
app.use(express.json());


//teszt
const routeP = require('./routes/route-admin');
app.use(routeP);

app.listen(PORT, () => {
  console.log("App listening at: http://localhost:8080/");
});