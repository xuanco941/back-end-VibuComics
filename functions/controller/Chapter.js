const { db } = require('../config/firebase');

class Chapter{
    //Thêm chapter
  async AddChapter(req, res) {
    let linkAnh = [];
    let tenChap = req.body.tenChap;
    let comicId = req.body.comicId;
    await db.collection('comics').doc(comicId).collection('chaps').doc(tenChap).set({
      tenChap: tenChap
    }).then(() => {
        return res.status(200).json({
            status: 'success',
            message: 'Thêm chapter thành công.',
            data: {
                comicId,
                tenChap
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
