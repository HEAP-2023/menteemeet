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
router.delete('/session/:sessID', authenticateToken, userController.deleteSessionBySessionID);

router.get('/approvedApps', authenticateToken, userController.getApprovedApps);
router.get('/pendingApps', authenticateToken, userController.getPendingApps);
router.get('/rejectedApps', authenticateToken, userController.getRejectedApps);

router.get('/feedback', authenticateToken, userController.getAllFeedback);
router.post('/addFeedback', authenticateToken, userController.addFeedback);
router.get('/listofMentors/:progID', authenticateToken, userController.getListOfMentors);
router.get('/listofMentees/:progID', authenticateToken, userController.getListOfMentees);

router.put('/', authenticateToken, userController.updateUser);
router.post('/programmes', authenticateToken, userController.signup);

router.get('/:id/skills', authenticateToken, userController.getSkill);
router.post('/:id/skills', authenticateToken, userController.addSkill);
router.get('/:id/interests', authenticateToken, userController.getInterest);
router.post('/:id/interests', authenticateToken, userController.addInterest);

router.get('/getOrganiserName/:progID', authenticateToken, userController.getOrganiserName);
router.get('/announcements', authenticateToken, userController.getAllAnnouncements);

router.get('/:id', authenticateToken, userController.getUser);

module.exports = router;