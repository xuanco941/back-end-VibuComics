const express = require('express');
const router = express.Router();
const Chapter = require('../controller/Chapter');

const multer = require('multer');
const {storage} = require('../config/StorageImg');
const upload = multer({ storage: storage });

router.post("/add-chapter", upload.array('image'), Chapter.AddChapter);
router.post("/delete-chapter",Chapter.DeleteChapter);
router.get("/get-all-chapters",Chapter.GetAllChapters);
router.get("/get-a-chapter",Chapter.GetAChapters);

module.exports = router;