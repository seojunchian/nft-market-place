var express = require("express");
var app = express();
var path = require("path");
var homeRouter = require("./routes/routeHome");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);

app.listen(3000);
