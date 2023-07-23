const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddlewares');
const accountController = require('../controllers/accountController');

router.post('/register', accountController.register);
router.post('/login', accountController.login);
//Axel dw logout
// router.put('/logout', authenticateToken, accountController.logout);
// router.use(authenticateToken);
router.post('/changePassword', authenticateToken, accountController.changePassword);

module.exports = router;