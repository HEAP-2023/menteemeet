const express = require('express');
const router = express.Router();

const { registerAcc, loginAcc, updateAcc, refreshTokFunc } = require('../controllers/userController');

router.post('/register', registerAcc);
router.post('/login', loginAcc);

//for refreshTokens
router.post('/token', refreshTokFunc)

//FOR UPDATING. 
//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);
// router.get('/update', authenticateToken, updateAcc);
router.put('/update', authenticateToken, updateAcc);

module.exports = router