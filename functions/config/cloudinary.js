const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dh3sptfo2', 
    api_key: '293775476763951', 
    api_secret: '2VGrf9jRppUf6J7gdRKuG1rqRZc' 
  });


  module.exports = { cloudinary };
