const express = require('express');
const router = express.Router();
//For file uploads
const multer = require('multer')
const upload = multer({ dest: 'temp/uploads' });

const programmeController = require('../controllers/programmeController');

//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);

router.post('/', authenticateToken, upload.single('display_image'), programmeController.addProg);
//for deletion - for programme.
router.delete('/:id', authenticateToken, programmeController.deleteProg);

module.exports = router