
///// -------------------  W I P -----------------   ////////

const express = require('express');

const router = express.Router();

const { registerAcc, loginAcc, updateAcc } = require('../controllers/userController');

router.post('/register', registerAcc);
router.post('/login', loginAcc);

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
router.get('/update', authenticateToken, updateAcc);

module.exports = router