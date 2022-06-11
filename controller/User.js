const { db } = require('../config/firebase');


class User {

  async GetAllUsers(req, res) {
    try {
      const allUsers = [];
      const querySnapshot = await db.collection('users').get();
      querySnapshot.forEach((doc) => allUsers.push(doc.data()));
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new User;

