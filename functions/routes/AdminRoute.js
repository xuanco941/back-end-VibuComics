const express = require('express');
const router = express.Router();

const Admin = require('../controller/Admin');


router.post('/signin', Admin.SignIn);
router.post('/refresh-token' , Admin.RefreshToken);

module.exports = router;