const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//for refreshTokens
// router.post('/token', refreshTokFunc)

//FOR UPDATING.
const { authenticateToken } = require('../middlewares/authMiddlewares');

//AUTHENTICATED ROUTES
//get Prog by UserID & Role
router.get('/programmes/enrolled', authenticateToken, userController.getAllProgByUserID); /* prev was /:role instead of enrolled  -- bruce*/
router.get('/programmes/', authenticateToken, userController.getUnsignedProg);

router.get('/session', authenticateToken, userController.getAllSessions);
router.get('/session/:progID', authenticateToken, userController.getSessionsByProgID);
router.post('/session', authenticateToken, userController.addSessionByGrpID);
router.put('/session/update', authenticateToken, userController.updateSessionBySessionID);

router.get('/approvedApps', authenticateToken, userController.getApprovedApps);
router.get('/pendingApps', authenticateToken, userController.getPendingApps);
router.get('/rejectedApps', authenticateToken, userController.getRejectedApps);

router.put('/', authenticateToken, userController.updateUser);

router.get('/:id/skills', authenticateToken, userController.getSkill);
router.post('/:id/skills', authenticateToken, userController.addSkill);
router.get('/:id/interests', authenticateToken, userController.getInterest);
router.post('/:id/interests', authenticateToken, userController.addInterest);
router.get('/:id', authenticateToken, userController.getUser);

router.post('/programmes', authenticateToken, userController.signup)

module.exports = router;