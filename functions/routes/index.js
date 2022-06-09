const ComicRoute = require('./ComicRoute');
const AdminRoute = require('./AdminRoute');
const ChapterRoute = require('./ChapterRoute');
const UserRoute = require('./UserRoute');


function Route(app) {
    app.use('/admin', AdminRoute);
    app.use('/comic', ComicRoute);
    app.use('/chapter', ChapterRoute);
    app.use('/user', UserRoute);
}


module.exports = Route