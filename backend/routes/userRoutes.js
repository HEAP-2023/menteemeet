const express = require('express');
const router = express.Router();

const { registerUser, loginUser, updateUser, refreshTokFunc } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

//for refreshTokens
router.post('/token', refreshTokFunc)

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
router.put('/update', authenticateToken, updateUser);

module.exports = router