const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const membersApi = require("./routes/api/members");

//setup
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static folder
app.use(express.static(path.join(__dirname, "public")));

const logger = (req, res, next) => {
	switch (req.method) {
		case "GET":
			next();
			break;
		case "POST":
			next();
			break;
		case "PUT":
			next();
			break;
		case "DELETE":
			next();
			break;
		default:
			res.sendStatus(400);
			res.end();
	}
};

app.use("/api/members", membersApi);
app.use(logger);

app.listen(app.get("port"), () => {
	console.log("Listening on port", app.get("port"));
});
