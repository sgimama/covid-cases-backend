const router = require('express').Router();
const apiUsersRouter = require('./users/api');

router.use('/users', apiUsersRouter);

module.exports = router;