const express = require("express");
const router = express.Router();
const slotMachineController = require("../../controllers/slotMachineController");
const auth = require("../../middlewares/Auth");

router.get("/pull", auth, slotMachineController.pull);

module.exports = router;
 