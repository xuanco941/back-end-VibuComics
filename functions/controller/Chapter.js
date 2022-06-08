const { db } = require('../config/firebase');
const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');

class Chapter {

  // xem cac chapter
  async GetAllChapters(req, res) {
    const { comicId } = req.query;
    try {
      const allChapter = [];
      const querySnapshot = await db.collection('comics').doc(comicId).collection('chaps').get();
      querySnapshot.forEach((doc) => allChapter.push(doc.data()));
      return res.status(200).json(allChapter);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // xem 1 chapter
  async GetAChapters(req, res) {
    const { comicId, tenChap } = req.query;
    try {
      const querySnapshot = await (await db.collection('comics').doc(comicId).collection('chaps').doc(tenChap).get()).data();
      return res.status(200).json(querySnapshot);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }


  //Thêm chapter
  async AddChapter(req, res) {
    let tenChap = req.body.tenChap;
    let comicId = req.body.comicId;
    let tenTruyen = req.body.tenTruyen;

    //up img to cloudinary and get link
    let links = [];
    if (req.files) {
      for (const element of req.files) {
        await cloudinary.uploader.upload('uploads/' + element.filename,
          {
            folder: `${tenTruyen}/${tenChap}`,
            public_id: element.filename
          },
          function (error, result) {
            links.push(result.url);
            fs.unlinkSync('./uploads/' + element.filename);
          });
      }
    }



    await db.collection('comics').doc(comicId).collection('chaps').doc(tenChap).set({
      idChap: tenChap.trim(),
      tenChap: tenChap,
      links: links
    }).then(() => {
      return res.status(200).json({
        status: 'success',
        message: 'Thêm chapter thành công.',
        data: {
          comicId,
          tenChap,
          links
        }
      });
    }).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    })
  }


  //Xóa chapter
  async DeleteChapter(req, res) {
    const { comicId, tenChap } = req.body;
    const chap = await db.collection('comics').doc(comicId).collection('chaps').doc(tenChap);
    chap.delete().catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    });
    return res.status(200).json({
      status: 'success',
      message: `Xóa ${tenChap} thành công.`,
    });
  } catch(error) {
    return res.status(500).json(error.message);
  }

}

module.exports = new Chapter;
