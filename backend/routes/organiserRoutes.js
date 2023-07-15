const express = require('express');
const router = express.Router();

const organiserController = require('../controllers/organiserController');

//FOR UPDATING.
//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);

router.put('/:id', authenticateToken, organiserController.updateOrg);
router.put('/:id/logout', authenticateToken, organiserController.logoutOrg)

// router.get('/:id', authenticateToken, organiserController.getOrg);

module.exports = router;