const express = require("express");
const router = express.Router();
const slotMachineController = require("../../controllers/SlotMachineController");
const auth = require("../../middlewares/Auth");

router.post("/pull", auth, slotMachineController.pull);


module.exports = router;
 