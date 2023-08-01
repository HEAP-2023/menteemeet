const express = require('express');
const router = express.Router();

const programmeController = require('../controllers/programmeController');

router.get('/skills', programmeController.getAllSkills);
router.get('/interests', programmeController.getAllInterests);

//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

// AUTHENTICATED ROUTES
router.get('/', authenticateToken, programmeController.getAllProg);
// router.get('/:id/applications', authenticateToken, programmeController.getApplicationsByProgID);
// router.get('/:id/mentee-applications', authenticateToken, programmeController.getMenteeApplicationsByProgId);
// router.get('/:id/mentor-applications', authenticateToken, programmeController.getMentorApplicationsByProgId);
router.get('/:id', authenticateToken, programmeController.getEachProg);
router.post('/', authenticateToken, programmeController.runAlgo);
router.get('/:id/get-mentees-mentors', authenticateToken, programmeController.getMenteesMentorsByProgID);
router.get('/:id/scorer', authenticateToken, programmeController.scorer);

// UNAUTHENTICATED ROUTES
router.get('/search-by-name/:name', programmeController.searchProgByName);

module.exports = router;