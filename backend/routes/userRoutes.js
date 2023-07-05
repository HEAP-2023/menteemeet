const express = require('express');

const router = express.Router();

const { registerUser, loginUser, updateUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

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
router.put('/:id/update', authenticateToken, updateUser);

module.exports = router