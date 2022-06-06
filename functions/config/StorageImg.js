const multer = require('multer');

module.exports = storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// app.post('/', upload, async (req, res) => {
//     let url = [];
//     imgs = req.files;
//     for (const element of imgs) {
//         await cloudinary.uploader.upload('uploads/' + element.filename, function (error, result) { url.push(result.url); fs.unlinkSync('./uploads/' + element.filename) });
//     }
//     res.json(url);
// })