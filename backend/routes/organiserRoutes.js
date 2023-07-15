const express = require('express');
const router = express.Router();
//For file uploads
const multer = require('multer')
const upload = multer({ dest: 'temp/uploads' });

const organiserController = require('../controllers/organiserController');

//FOR UPDATING.
//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);

// router.get('/:id/programmes', authenticateToken, organiserController.getProg);
router.post('/:id/programmes', authenticateToken, upload.single('display_image'), organiserController.addProg);

module.exports = router;