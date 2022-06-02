const { db } = require('../config/firebase');

class Comic {
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

      res.status(200).send({
        status: 'success',
        message: 'comic added successfully',
        data: comicObject,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }


  async AddChapter(req,res) {
    let linkAnh = [];
    let tenChap = req.body.tenChap;
    let idComic = req.body.idComic;
    db.collection('comics').doc(idComic).collection('chaps').doc(tenChap).set({
      tenChap: tenChap
    })
  }


}

module.exports = new Comic;

