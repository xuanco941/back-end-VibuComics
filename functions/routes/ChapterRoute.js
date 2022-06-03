const express = require('express');
const router = express.Router();

const Chapter = require('../controller/Chapter');

router.post("/add-chapter", Chapter.AddChapter);
router.post("/delete-chapter",Chapter.DeleteChapter);
router.get("/get-all-chapters",Chapter.GetAllChapters);
router.get("/get-a-chapter",Chapter.GetAChapters);

module.exports = router;