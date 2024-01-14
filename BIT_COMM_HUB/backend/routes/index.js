const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var router = express.Router();
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.set("view engine", "ejs");
let url =
	"mongodb+srv://vaibhavkumargupta2004:mrfD73qXcn685Bsi@megacluster.upvlkjb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url);

//signin
const userSchema = mongoose.Schema({
	username: String,
	password: String,
});
const User = mongoose.model("User", userSchema);
router.use(bodyParser.json());
router.use(cors());
app.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

// var MainUser;
//Sign up
router.post("/signup", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	console.log(password);
	const user = new User({
		username: username,

		password: password,
	});
	MainUser = username;
	user
		.save()
		.then(() => {
			res.send({ message: "User registered successfully" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error occurred" });
		});
});

// Login endpoint
router.post("/login", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		console.log(username);
		console.log(password);
		const detail = await User.findOne({ username: username });
		console.log(detail);
		if (detail.password === password) {
			res.send({ message: "User Found" });
		} else {
			alert("invalid detail");
		}
	} catch (error) {}
});
//image database //image in profile
const imgDB = new mongoose.Schema({
	userData: String,
	image: String,
});
const Pimage = mongoose.model("Pimage", imgDB);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "_" + Date.now() + path.extname(file.originalname)
		);
	},
});
const upload = multer({
	storage: storage,
});

router.post("/upload", upload.single("file"), (req, res) => {
	const { pname } = req.query;
	Pimage.findOneAndDelete({ userData: pname })
		.then(() => {
			// Create a new entry for the uploaded image
			Pimage.create({ userData: pname, image: req.file.filename })
				.then((result) => res.json(result))
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
});
router.get("/getImage", async (req, res) => {
	const { pname } = req.query;
	Pimage.findOne({ userData: pname })
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});

//hostel DAtabase

const hostel = new mongoose.Schema({
	userData_h: String,
	chat_h: String,
	image_h: String,
	tf: String,
});
const hostelDB = mongoose.model("hostelDB", hostel);
const storage_h = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images2");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "_" + Date.now() + path.extname(file.originalname)
		);
	},
});
const upload_h = multer({
	storage: storage_h,
});
router.post("/upload_h", upload_h.single("file"), async (req, res) => {
	const { pname_h, chat_h, tf } = req.query;

	// console.log("++++++++++++++++++" + req.file);
	// let isImgPresent;
	try {
		// if (req.file) {
		const result = await hostelDB.create({
			userData_h: pname_h,
			chat_h: chat_h,
			image_h: req.file.filename,
			tf: tf,
		});
		// } else {
		// 	const result = await hostelDB.create({
		// 		userData_h: pname_h,
		// 		chat_h: chat_h,
		// 		// image_h: req.file.filename,
		// 		tf: tf,
		// 	});
		// }

		console.log("Uploaded:", result);
		res.json(result);
	} catch (error) {
		console.error("Error uploading:", error);
		res.status(500).json({ error: "Failed to upload file" });
	}
});
router.get("/getImage_h", async (req, res) => {
	try {
		const data = await hostelDB.find();

		const chatMessages = data.map((item) => item.chat_h);
		const userxx = data.map((item) => item.userData_h);
		const id2 = data.map((item) => item.image_h);
		const t_f = data.map((item) => item.tf);

		res.status(200).json({ chatMessages, userxx, id2, t_f });
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});
// router.get("/getImage_h", async (req, res) => {
// 	try {
// 		const HData = await hostelDB.find();
// 		console.log("Data fetched from database:", HData);
// 		if (HData && HData.length > 0) {
// 			const chatMessages = HData.map((item) => item.chat_h);
// 			const userxx = HData.map((item) => item.userData_h);
// 			const id2 = HData.map((item) => item.image_h);
// 			//console.log("Chat Messages:", id2);

// 			const obj = { chatMessages, userxx, id2 };
// 			console.log("Chat Messages:", obj);
// 			res.status(200).json(obj);
// 		} else {
// 			res.status(404).json({ message: "Data not found" });
// 		}
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 		res.status(500).json({ message: "Internal Server Error" });
// 	}
// });
//---xxx----//

const Prof_branch = mongoose.Schema({
	MainUser: String,
	chat: String,
	id1: String,
});

const Cs = mongoose.model("Cs", Prof_branch);

//Creating CS prof DAtabase

router.post("/create1", async function (req, res) {
	console.log("entered");

	const { MainUser, Chat, id1 } = req.body; // Destructure request body

	try {
		const chatCreated = await Cs.create({
			MainUser,
			chat: Chat,
			id1,
		});

		console.log("padh lii");
		console.log("Posted");
		res
			.status(200)
			.send({ message: "Chat record created successfully", data: chatCreated });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.send({ message: "Failed to create chat record", error: err.message });
	}
});

//storing userNAme

//display
// console.log(MainUser);
router.get("/cs", async function (req, res, next) {
	try {
		const csData = await Cs.find();
		if (csData && csData.length > 0) {
			const chatMessages = csData.map((item) => item.chat);
			const userxx = csData.map((item) => item.MainUser);
			const id2 = csData.map((item) => item.id1);
			//console.log("Chat Messages:", id2);

			const obj = { chatMessages, userxx, id2 };
			// console.log("Chat Messages:", obj);
			res.status(200).json(obj);
		} else {
			res.status(404).json({ message: "Data not found" });
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

//senior database

const sen = mongoose.Schema({
	MainUser: String,
	chat: String,
	id1: String,
});
//k20

const badaK20 = mongoose.model("badaK20", sen);

router.post("/seniorK20", async function (req, res) {
	const MainUser = req.body.MainUser;
	const chat = req.body.Chat;
	const id1 = req.body.id1;

	console.log(req.body.MainU);
	const intCreated = await badaK20.create({
		MainUser: MainUser,
		chat: chat,
		id1: id1,
	});
	intCreated
		.save()
		.then(() => {
			res.send({ message: "Posted" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error occurred" });
		});
});

router.get("/alK20", async function (req, res, next) {
	try {
		const csData = await badaK20.find();
		if (csData && csData.length > 0) {
			const chatMessages = csData.map((item) => item.chat);
			const userxx = csData.map((item) => item.MainUser);
			const id2 = csData.map((item) => item.id1);
			//console.log("Chat Messages:", id2);

			const obj = { chatMessages, userxx, id2 };
			// console.log("Chat Messages:", obj);
			res.status(200).json(obj);
		} else {
			res.status(404).json({ message: "Data not found" });
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

//k21
const badaK21 = mongoose.model("badaK21", sen);

router.post("/seniorK21", async function (req, res) {
	const MainUser = req.body.MainUser;
	const chat = req.body.Chat;
	const id1 = req.body.id1;

	console.log(req.body.MainU);
	const intCreated = await badaK21.create({
		MainUser: MainUser,
		chat: chat,
		id1: id1,
	});
	intCreated
		.save()
		.then(() => {
			res.send({ message: "Posted" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error occurred" });
		});
});

router.get("/alK21", async function (req, res, next) {
	try {
		const csData = await badaK21.find();
		if (csData && csData.length > 0) {
			const chatMessages = csData.map((item) => item.chat);
			const userxx = csData.map((item) => item.MainUser);
			const id2 = csData.map((item) => item.id1);
			//console.log("Chat Messages:", id2);

			const obj = { chatMessages, userxx, id2 };
			// console.log("Chat Messages:", obj);
			res.status(200).json(obj);
		} else {
			res.status(404).json({ message: "Data not found" });
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// k22
const badaK22 = mongoose.model("badaK22", sen);

router.post("/seniorK22", async function (req, res) {
	const MainUser = req.body.MainUser;
	const chat = req.body.Chat;
	const id1 = req.body.id1;

	console.log(req.body.MainU);
	const intCreated = await badaK22.create({
		MainUser: MainUser,
		chat: chat,
		id1: id1,
	});
	intCreated
		.save()
		.then(() => {
			res.send({ message: "Posted" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error occurred" });
		});
});

router.get("/alK22", async function (req, res, next) {
	try {
		const csData = await badaK22.find();
		if (csData && csData.length > 0) {
			const chatMessages = csData.map((item) => item.chat);
			const userxx = csData.map((item) => item.MainUser);
			const id2 = csData.map((item) => item.id1);
			//console.log("Chat Messages:", id2);

			const obj = { chatMessages, userxx, id2 };
			// console.log("Chat Messages:", obj);
			res.status(200).json(obj);
		} else {
			res.status(404).json({ message: "Data not found" });
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// aluminii

const bada = mongoose.model("bada", sen);

router.post("/senior", async function (req, res) {
	const MainUser = req.body.MainUser;
	const chat = req.body.Chat;
	const id1 = req.body.id1;

	console.log(req.body.MainU);
	const intCreated = await bada.create({
		MainUser: MainUser,
		chat: chat,
		id1: id1,
	});
	intCreated
		.save()
		.then(() => {
			res.send({ message: "Posted" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error occurred" });
		});
});

router.get("/al", async function (req, res, next) {
	try {
		const csData = await bada.find();
		if (csData && csData.length > 0) {
			const chatMessages = csData.map((item) => item.chat);
			const userxx = csData.map((item) => item.MainUser);
			const id2 = csData.map((item) => item.id1);
			//console.log("Chat Messages:", id2);

			const obj = { chatMessages, userxx, id2 };
			// console.log("Chat Messages:", obj);
			res.status(200).json(obj);
		} else {
			res.status(404).json({ message: "Data not found" });
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

//delete

router.get("/deleteAll", async function (req, res) {
	try {
		// Delete all documents from the User collection
		await Cs.deleteMany({});

		res.send("done");
	} catch (error) {
		console.error("Error deleting all users:", error);
		res.status(500).send({ message: "Server error occurred" });
	}
});

router.get("/findAll", async function (req, res) {
	let userAll = await hostelDB.find();

	res.send(userAll);
});
app.use(router);

app.listen(() => {
	console.log(`Server running`);
});

module.exports = router;
