const express = require('express');
const router = express.Router();

const Comic = require('../controller/Comic');

router.post("/add-comic",Comic.AddComic);
router.post("/add-chapter", Comic.AddChapter);

module.exports = router;