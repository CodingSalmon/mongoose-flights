const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

router.get('/destinations/new', destinationsCtrl.new)
router.post('/destinations', destinationsCtrl.create);

module.exports = router;