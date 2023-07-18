const express = require('express');
const router = express.Router();

const programmeController = require('../controllers/programmeController');

//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);

router.get('/', authenticateToken, programmeController.getAllProg);
router.get('/:id', authenticateToken, programmeController.getEachProg);

// router.post('/', authenticateToken, upload.single('display_image'), programmeController.addProg);
//for deletion - for programme.
router.delete('/:id', authenticateToken, programmeController.deleteProg);

module.exports = router