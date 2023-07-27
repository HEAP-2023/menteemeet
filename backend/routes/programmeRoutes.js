const express = require('express');
const router = express.Router();

const programmeController = require('../controllers/programmeController');

router.get('/skills', programmeController.getAllSkills);
router.get('/interests', programmeController.getAllInterests);

//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);

router.get('/', authenticateToken, programmeController.getAllProg);
router.get('/:id/applications', authenticateToken, programmeController.getApplicationsByProgID);
router.get('/:id/mentee-applications', authenticateToken, programmeController.getMenteeApplicationsByProgId);
router.get('/:id/mentor-applications', authenticateToken, programmeController.getMentorApplicationsByProgId);
router.get('/:id', authenticateToken, programmeController.getEachProg);

//Testing Only.
router.post('/', authenticateToken, programmeController.runAlgo);

module.exports = router;