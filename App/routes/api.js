const router = require('express').Router();
const authRouter = require('./auth/api');
const slotMachineRouter = require('./slotMachine/api');
const countriesRouter = require('./countries/api');

router.use('/auth', authRouter);
router.use('/slotMachine', slotMachineRouter);
router.use('/countries', countriesRouter);

module.exports = router;