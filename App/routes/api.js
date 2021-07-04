const router = require("express").Router();
const CovidCasesController = require("../controllers/CovidCasesController");

router.post("/getcases", CovidCasesController.getCases);

module.exports = router;
