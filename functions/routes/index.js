const ComicRoute = require('./ComicRoute');
const AdminRoute = require('./AdminRoute');
const ChapterRoute = require('./ChapterRoute');
const CheckAdmin = require('../middleware/CheckAdmin');

function Route (app){
    app.use('/admin', AdminRoute);
    app.use('/comic', ComicRoute);
    app.use('/chapter', ChapterRoute);
}


module.exports = Route