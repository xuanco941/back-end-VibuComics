const express = require('express');
const router = express.Router();

const User = require('../controller/User');


router.get('/get-all-users', User.GetAllUsers);

module.exports = router;