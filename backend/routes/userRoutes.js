const express = require('express');
const router = express.Router();

const { getUser, updateUser } = require('../controllers/userController');

//for refreshTokens
// router.post('/token', refreshTokFunc)

//FOR UPDATING.
// const {
//     ,
// } = require('../controllers/userController');
//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);
// router.get('/update', authenticateToken, updateAcc);
router.put('/update', authenticateToken, updateUser);
router.get('/:id', authenticateToken, getUser);

module.exports = router