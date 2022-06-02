const express = require('express');
const router = express.Router();

const Chapter = require('../controller/Chapter');

router.post("/add-chapter", Chapter.AddChapter);
router.post("/delete-chapter",Chapter.DeleteChapter);

module.exports = router;