const express = require('express');
const router = express.Router();
const CheckAdmin = require('../middleware/CheckAdmin');
const Comic = require('../controller/Comic');

// const {storage} = require('../config/StorageImg');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage }).array('image');



router.post("/add-comic", upload , Comic.AddComic);
router.post("/delete-comic", CheckAdmin, Comic.DeleteComic);
router.get("/get-all-comics", Comic.GetAllComics);

module.exports = router;