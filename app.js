const express = require("express");
const path = require("path");
const ejsMate = require('ejs-mate');
const bodyParser = require("body-parser");
const ExpressError = require('./utils/ExpressError');

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
	res.render("home", { pageTitle: "Evi Edor" });
});

app.get("/myprojects", (req, res, next) => {
	res.render("myprojects", { pageTitle: "Personal Projects" });
});
app.get("/about", (req, res, next) => {
	res.render("about", { pageTitle: "About Me" });
});
app.get("/contactme", (req, res, next) => {
	res.render("contactme", { pageTitle: "Contact Me" });
});

app.all("*", (req, res, next) => {
	next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Oh No, Something Went Wrong!";
	res.status(statusCode).render("error", { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
