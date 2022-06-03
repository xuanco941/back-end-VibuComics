const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');

function generateAccessToken(data) {
    return jwt.sign(data, process.env.SECRET_KEY_ADMIN, { expiresIn: process.env.SECRET_KEY_EXP_ADMIN })
}

class Admin {
    async SignIn(req, res) {
        const username = req.body.username.trim();
        const password = req.body.password.trim();

        try {
            const allAccount = [];
            const querySnapshot = await db.collection('admin').get();
            querySnapshot.forEach( (doc) => allAccount.push(doc.data()));
            let isAdmin = allAccount.some(e =>
                e.username == username && e.password == password
            )
            if(isAdmin==true){
                const accessTokenAdmin = generateAccessToken({ username });
                const refreshTokenAdmin = jwt.sign({ username }, process.env.SECRET_KEY_REFRESH_ADMIN);
                db.collection('admin').doc('admin').set({
                    username,password,refreshTokenAdmin
                })
                res.status(200).json({ status: 'success',accessTokenAdmin, refreshTokenAdmin});

            }
            else{
                res.status(401).json({ status: 'error', message: 'Sai tài khoản hoặc mật khẩu' })
            }
          } catch (error) {
            return res.status(500).json(error.message);
          }
        
        
    }

    async RefreshToken(req, res) {
        if (!req.body.refreshTokenAdmin) res.status(403).json({ status: 'error', message: 'Không tìm thấy Refresh Token Admin' });
        const refreshTokenAdmin = req.body.refreshTokenAdmin;

        const allAccount = [];
            const querySnapshot = await db.collection('admin').get();
            querySnapshot.forEach( (doc) => allAccount.push(doc.data()));
            let isRefreshTokenAdmin = allAccount.some(e =>
                refreshTokenAdmin == e.refreshTokenAdmin
            )
            if(isRefreshTokenAdmin==true){
                jwt.verify(refreshTokenAdmin, process.env.SECRET_KEY_REFRESH_ADMIN, (err, user) => {
                    if (err) res.status(401).json({ status: 'error', message: 'Xác thực Refresh Token Admin gặp lỗi' });
                    else {
                        const accessTokenAdmin = generateAccessToken({ username: user.username });
                        res.status(201).json({ status: 'success', data: { accessTokenAdmin } });
                    }
                });
            }
            else{
                res.status(403).json({ status: 'error', message: 'Refresh Token Admin không hợp lệ' });
            }

    }

}


module.exports = new Admin