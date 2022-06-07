const express = require('express');
const router = express.Router();
const CheckAdmin = require('../middleware/CheckAdmin');
const Comic = require('../controller/Comic');

const {storage} = require('../config/StorageImg');
const multer = require('multer');

const upload = multer({ storage: storage });



router.post("/add-comic",CheckAdmin ,upload.array('image'), Comic.AddComic);
router.post("/delete-comic", CheckAdmin, Comic.DeleteComic);
router.get("/get-all-comics", Comic.GetAllComics);

module.exports = router;