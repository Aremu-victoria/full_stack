const {signup,signin,verifyToken} = require('../controller/user.controller');
const express = require('express');
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/verifyToken',verifyToken);

module.exports = router;