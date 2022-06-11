const admin = require('firebase-admin');
const serviceAccount = require('./vibu-comic.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  storageBucket: `gs://${serviceAccount.project_id}.appspot.com`
});

const db = admin.firestore();

// Cloud storage
const bucket = admin.storage().bucket()

module.exports = { admin, db, bucket };