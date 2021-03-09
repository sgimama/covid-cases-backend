const router = require('express').Router();
const authRouter = require('./auth/api');
const usersRouter = require('./users/api');
const countriesRouter = require('./countries/api');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/countries', countriesRouter);

module.exports = router;