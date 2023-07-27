const express = require('express');
const router = express.Router();
//For file uploads
const multer = require('multer')
const upload = multer({ dest: 'temp/uploads' });

const organiserController = require('../controllers/organiserController');

//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);
router.get('/programmes', authenticateToken, organiserController.getAllProgsByOrgID);
router.put('/applications/:appID', authenticateToken, organiserController.evaluateApp);
router.get('/programmes/:progID/applications', authenticateToken, organiserController.getApp);

router.get('/:id', authenticateToken, organiserController.getOrg);
router.put('/', authenticateToken, organiserController.updateOrg);

router.post('/programmes', authenticateToken, upload.single('display_image'), organiserController.addProg);
router.delete('/programmes/:progID', authenticateToken, organiserController.deleteProg);

// router.get('/:id', authenticateToken, organiserController.getOrg);

module.exports = router;