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
// router.use(authenticateToken);

//get Prog by UserID & Role
router.get('/:id/programmes/:role', authenticateToken, userController.getAllProgByUserID);

router.put('/:id', authenticateToken, userController.updateUser);

router.get('/:id', authenticateToken, userController.getUser);
router.get('/:id/skills', authenticateToken, userController.getSkill);
router.post('/:id/skills', authenticateToken, userController.addSkill);
router.get('/:id/interests', authenticateToken, userController.getInterest);
router.post('/:id/interests', authenticateToken, userController.addInterest);

module.exports = router;