const { db } = require('../config/firebase');

class Comic {

  //Thêm comic
  async AddComic(req, res) {
    let giaChap = req.body.giaChap;
    let moTa = req.body.moTa;
    let tacGia = req.body.tacGia;
    let tenKhac = req.body.tenKhac;
    let tenTruyen = req.body.tenTruyen;
    let theLoai = req.body.theLoai;

    try {
      const comic = db.collection('comics').doc();
      const comicObject = {
        id: comic.id,
        linkAnhTruyen: "",
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
        message: 'Thêm truyện thành công.',
        data: comicObject,
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
