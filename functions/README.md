--Down về cần set up file .env :
SECRET_KEY_ADMIN=xuan
SECRET_KEY_EXP_ADMIN=300s
SECRET_KEY_REFRESH_ADMIN=bimat2

-- thêm file config cloudinary(đang có rồi)

--Trong functions/config cần thêm file vibu-comic.json, là secret file token của firebase

-- di chuyển vào folder functions , run terminal node index.js

-- PORT=3000

--firebase cần tạo 3 collection : admin(thêm username, password default) , comics, users