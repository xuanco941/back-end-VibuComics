const ComicRoute = require('./ComicRoute');
const AdminRoute = require('./AdminRoute');

function Route (app){
    app.use('/admin', AdminRoute);
    app.use('/comic', ComicRoute)
}


module.exports = Route