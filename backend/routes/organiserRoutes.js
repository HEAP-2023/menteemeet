const express = require('express');
const router = express.Router();
//For file uploads
const multer = require('multer')
const upload = multer({ dest: 'temp/uploads' });

const organiserController = require('../controllers/organiserController');

const { authenticateToken } = require('../middlewares/authMiddlewares');

//AUTHENTICATED ROUTES
router.get('/programmes', authenticateToken, organiserController.getAllProgsByOrgID);
router.put('/applications/:appID', authenticateToken, organiserController.evaluateApp);
router.get('/programmes/:progID/applications', authenticateToken, organiserController.getApp);
router.get('/:id', authenticateToken, organiserController.getOrg);
router.put('/', authenticateToken, organiserController.updateOrg);
router.post('/programmes', authenticateToken, upload.single('display_image'), organiserController.addProg);
router.delete('/programmes/:progID', authenticateToken, organiserController.deleteProg);

router.post('/announcements', authenticateToken, organiserController.addAnnouncementByProgID);
router.put('/announcements', authenticateToken, organiserController.updateAnnouncementByProgID);
router.get('/announcements/:progID', authenticateToken, organiserController.getAnnouncementsByProgID);

// router.get('/:id', authenticateToken, organiserController.getOrg);

module.exports = router;