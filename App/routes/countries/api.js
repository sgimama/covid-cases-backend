const express = require("express");
const router = express.Router();
const CountriesController = require("../../controllers/CountriesController");

router.get("/single/:data", CountriesController.getOne);

router.get("/list/:data", CountriesController.getList);

router.get("/all", CountriesController.getMatch);

module.exports = router;
