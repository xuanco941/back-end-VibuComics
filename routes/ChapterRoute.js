const express = require('express');
const router = express.Router();
const Chapter = require('../controller/Chapter');
const CheckAdmin = require('../middleware/CheckAdmin');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post("/add-chapter", CheckAdmin, upload.array('image'), Chapter.AddChapter);
router.post("/delete-chapter", CheckAdmin, Chapter.DeleteChapter);
router.get("/get-all-chapters", Chapter.GetAllChapters);
router.get("/get-a-chapter", Chapter.GetAChapters);

module.exports = router;