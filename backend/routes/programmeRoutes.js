const express = require('express');
const router = express.Router();

const { deleteProg } = require('../controllers/programmeController');

//call authToken func
const { authenticateToken } = require('../middlewares/authMiddlewares');

//Instead of putting "authToken" as an arg in each route,
// you can do this instead. So every route in this router will
// use the auth function as a middleware.
router.use(authenticateToken);

//for deletion - for programme.
router.delete('/delete/:id', authenticateToken, deleteProg);

module.exports = router