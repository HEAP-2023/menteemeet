const express = require('express');
const router = express.Router();

const programmeController = require('../controllers/programmeController');

//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
// router.use(authenticateToken);

router.get('/', authenticateToken, programmeController.getAllProg);
router.get('/:id', authenticateToken, programmeController.getEachProg);
router.get('/:id/applications', authenticateToken, programmeController.getApplicationsByProgID);

module.exports = router