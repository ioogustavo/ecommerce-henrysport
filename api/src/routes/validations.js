function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(404);
        res.send('No se logró autentificar');
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.admin === true) {
        next();
    } else {
        res.send('Permiso denegado, no es admin')
    }
}
module.export = {isAuthenticated, isAdmin};