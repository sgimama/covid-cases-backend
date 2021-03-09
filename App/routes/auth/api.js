const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

router.post('/singup', AuthController.signUp)

module.exports = router;