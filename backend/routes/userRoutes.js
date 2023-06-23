
///// -------------------  W I P -----------------   ////////

const express = require('express');

const router = express.Router();

const { registerAcc, loginAcc } = require('../controllers/userController');

router.post('/register', registerAcc);
router.post('/login', loginAcc);

module.exports = router