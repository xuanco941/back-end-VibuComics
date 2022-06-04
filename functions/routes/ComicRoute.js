const express = require('express');
const router = express.Router();
const CheckAdmin = require('../middleware/CheckAdmin');
const Comic = require('../controller/Comic');

router.post("/add-comic",CheckAdmin, Comic.AddComic);
router.post("/delete-comic", CheckAdmin,Comic.DeleteComic);
router.get("/get-all-comics",Comic.GetAllComics);

module.exports = router;