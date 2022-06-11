const express = require('express');
const router = express.Router();
const CheckAdmin = require('../middleware/CheckAdmin');
const Comic = require('../controller/Comic');

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

router.post("/add-comic", CheckAdmin, upload.array('image'), Comic.AddComic);
router.post("/delete-comic", CheckAdmin, Comic.DeleteComic);
router.get("/get-all-comics", Comic.GetAllComics);

module.exports = router;