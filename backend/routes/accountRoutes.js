const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddlewares');
const accountController = require('../controllers/accountController');

router.post('/register', accountController.register);

router.use(authenticateToken);
router.post('/login', authenticateToken, accountController.login);
router.post('/logout', authenticateToken, accountController.logout);
router.post('/changePassword', authenticateToken, accountController.changePassword);

module.exports = router;