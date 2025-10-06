const express = require('express');
const { protect } = require('../middleware/auth');
const { getHomeData, addMember, getOutstanding } = require('../controllers/userController');
const router = express.Router();

router.use(protect);
router.get('/home', getHomeData);
router.post('/members', addMember);
router.get('/outstanding', getOutstanding);

module.exports = router;