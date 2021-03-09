const router = require('express').Router();
const apiUsersRouter = require('./users/api');
const apiCountriesRouter = require('./countries/api');

router.use('/users', apiUsersRouter);
router.use('/countries', apiCountriesRouter);

module.exports = router;