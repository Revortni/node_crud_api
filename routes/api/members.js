const express = require("express");
const membersRouter = express.Router();
const members = require("./members");

//static data
let DATA = require("./data.json");

const getMember = (req, res, next) => {
	const id = req.params.id;
	const filtered = DATA.filter(member => parseInt(id) === member.id);
	if (filtered.length > 0) {
		res.json(filtered);
	} else {
		res.status(400).json("No member matching id was found.");
	}
	res.end();
};

const addMember = (req, res, next) => {
	const data = req.body;
	data.id = DATA.length + 1;
	DATA.push(data);
	res.json(data);
	res.end();
};

const updateMember = (req, res, next) => {
	const id = req.params.id || null;

	if (!id) {
		res.json({ msg: "Pass id parameter" });
		res.end();
		return;
	}

	const data = req.body;

	DATA.forEach((member, index) => {
		if (parseInt(id) === member.id) {
			DATA[index] = { ...member, ...data };
		}
	});

	res.json(DATA);
	res.end();
};

const deleteMember = (req, res, next) => {
	const id = req.params.id || null;

	if (!id) {
		res.json({ msg: "Pass id parameter" });
		res.end();
		return;
	}

	const data = req.body;

	DATA = DATA.filter((member, index) => parseInt(id) !== member.id);

	res.json(DATA);
	res.end();
};

const getMemberList = (req, res, next) => {
	res.json(DATA);
	res.end();
	return;
};

//PUT
membersRouter.put("/update-member/:id", updateMember);

//PUT
membersRouter.delete("/delete-member/:id", deleteMember);

//GET
membersRouter.get("/:id", getMember);
membersRouter.get("/all", getMemberList);

//POST
membersRouter.post("/add-member", addMember);

module.exports = membersRouter;
