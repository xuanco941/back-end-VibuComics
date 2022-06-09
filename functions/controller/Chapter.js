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
    let links = [];

    //up img to cloudinary and get link

    if (req.files) {

      // sap xep file theo thu tu filename(number).png/jpg...
      let arrElementSort = [];
      for (const element of req.files) {
        let positionOfDot = element.filename.lastIndexOf('.');
        let index = 999;
        let chapNumber3 = element.filename.slice(positionOfDot - 3, positionOfDot);
        let chapNumber2 = element.filename.slice(positionOfDot - 2, positionOfDot);
        let chapNumber1 = element.filename.slice(positionOfDot - 1, positionOfDot);

        if (!isNaN(chapNumber3)) {
          index = parseInt(chapNumber3);
        }
        else if (!isNaN(chapNumber2)) {
          index = parseInt(chapNumber2);
        }
        else if (!isNaN(chapNumber1)) {
          index = parseInt(chapNumber1);
        }
        else {
          index = 999;
        }

        arrElementSort.push({element, index});
      }

      // sap xep
      let length = arrElementSort.length;
      for (let i = 0; i < length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < length; j++) {
          if (arrElementSort[j].index < arrElementSort[min].index) {
            min = j;
          }
        }
        let temp = arrElementSort[i];
        arrElementSort[i] = arrElementSort[min];
        arrElementSort[min] = temp;

      }

      // get all files to array
      let arrFiles = arrElementSort.map((e) => e.element);
      //upload to cloudinary
      for (const element of arrFiles) {
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



    let myarr = tenChap.split(" ");
    let idChap = myarr.join('');
    await db.collection('comics').doc(comicId).collection('chaps').doc(tenChap).set({
      idChap,
      tenChap,
      links
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
