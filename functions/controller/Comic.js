const { bucket, db, admin } = require('../config/firebase');
const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');


class Comic {

  async GetAllComics(req, res) {
    try {
      const allComics = [];
      const querySnapshot = await db.collection('comics').get();
      querySnapshot.forEach((doc) => allComics.push(doc.data()));
      return res.status(200).json(allComics);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //Thêm comic
  async AddComic(req, res) {
    let giaChap = req.body.giaChap ? req.body.giaChap : 0;
    let moTa = req.body.moTa ? req.body.moTa : '';
    let tacGia = req.body.tacGia ? req.body.tacGia : '';
    let tenKhac = req.body.tenKhac ? req.body.tenKhac : '';
    let tenTruyen = req.body.tenTruyen ? req.body.tenTruyen : '';
    let theLoai = req.body.theLoai ? req.body.theLoai : '';

    //up img to cloudinary and get link
    let links = [];
    if (req.files) {
      for (const element of req.files) {
        await cloudinary.uploader.upload('uploads/' + element.filename, 
        { folder: `${tenTruyen}`, 
        public_id: "linkAnhTruyen" },
          function (error, result) {
            links.push(result.url);
            fs.unlinkSync('./uploads/' + element.filename);
          });
      }
    }

    // save on firebase
    try {
      const comic = db.collection('comics').doc();
      const comicObject = {
        id: comic.id,
        linkAnhTruyen: links[0],
        giaChap,
        moTa,
        tacGia,
        tenKhac,
        tenTruyen,
        theLoai
      };
      comic.set(comicObject);

      res.status(200).json({
        status: 'success',
        message: 'Thêm truyện thành công.'
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  //Xóa Comic
  async DeleteComic(req, res) {
    const { comicId } = req.body;
    try {
      const comic = db.collection('comics').doc(comicId);
      const chaps = await db.collection('comics').doc(comicId).collection('chaps').listDocuments();
      //xoa chaps
      for (let i = 0; i < chaps.length; i++) {
        await chaps[i].delete().catch((error) => {
          return res.status(400).json({
            status: 'error',
            message: error.message,
          });
        });
      }

      //xoa thong tin truyện
      await comic.delete().catch((error) => {
        return res.status(400).json({
          status: 'error',
          message: error.message,
        });
      });

      return res.status(200).json({
        status: 'success',
        message: 'Xóa truyện thành công.',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  };


}

module.exports = new Comic;

