const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//for refreshTokens
// router.post('/token', refreshTokFunc)

//FOR UPDATING.
//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);

//get Prog by UserID & Role
router.get('/programmes/:role', authenticateToken, userController.getAllProgByUserID);
router.get('/programmes', authenticateToken, userController.getUnsignedProg);

router.get('/session', authenticateToken, userController.getAllSessions);

router.put('/', authenticateToken, userController.updateUser);

router.get('/:id/skills', authenticateToken, userController.getSkill);
router.post('/:id/skills', authenticateToken, userController.addSkill);
router.get('/:id/interests', authenticateToken, userController.getInterest);
router.post('/:id/interests', authenticateToken, userController.addInterest);
router.get('/:id', authenticateToken, userController.getUser);

router.post('/programmes', authenticateToken, userController.signup)

module.exports = router;