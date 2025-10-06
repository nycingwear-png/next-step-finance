const express = require('express');
const multer = require('multer');
const { register, login } = require('../controllers/authController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.fields([{name: 'frontId'}, {name: 'backId'}, {name: 'holderPhoto'}]), register);
router.post('/login', login);

module.exports = router;