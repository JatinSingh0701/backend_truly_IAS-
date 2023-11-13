const router = require("express").Router();
const infoController = require("../controllers/info.controller.js");

// Route to get all info from the database
router.get("/info", infoController.getInfo);

// Route to get specific info by ID from the database
router.get("/info/:id", infoController.getInfoById);

// Route to post new info data to the database
router.post("/info", infoController.postInfo);

// Route to delete info data from the database
router.delete("/info/:id", infoController.deleteInfo);

module.exports = router;
