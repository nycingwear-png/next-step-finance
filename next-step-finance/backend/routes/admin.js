const express = require('express');
const { protectAdmin } = require('../middleware/auth');
const { getUsers, updateUserBalance, approveLoan, getAllPermissions } = require('../controllers/adminController');
const router = express.Router();

router.use(protectAdmin);
router.get('/users', getUsers);
router.put('/users/:id/balance', updateUserBalance);
router.post('/loans/:id/approve', approveLoan);
router.get('/permissions', getAllPermissions);

module.exports = router;