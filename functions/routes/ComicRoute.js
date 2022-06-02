const express = require('express');
const router = express.Router();

const Comic = require('../controller/Comic');

router.post("/add-comic",Comic.AddComic);
router.post("/delete-comic",Comic.DeleteComic);

module.exports = router;