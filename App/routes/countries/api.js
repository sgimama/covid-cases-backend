const express = require("express");
const router = express.Router();
const CountriesController = require("../../controllers/CountriesController");

router.get("/single/:data", CountriesController.getOne);

router.get("/list/:data", CountriesController.getMatch);

router.get("/all", CountriesController.getList);

module.exports = router;
  