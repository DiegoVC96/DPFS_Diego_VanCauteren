const db = require('../database/models');

function userRecordameMiddleware(req, res, next) {
    if (req.session && req.session.userLogged) {
        return next();
    }

    if (req.cookies && req.cookies.userEmail) {
        db.User.findOne({
            where: { email: req.cookies.userEmail }
        })
        .then(userFromCookie => {
            if (userFromCookie) {
                const userToLog = userFromCookie.get({ plain: true });
                delete userToLog.password;
                req.session.userLogged = userToLog;
            }
            return next();
        })
        .catch(error => {
            console.log("Error en recordame:", error);
            return next();
        });
    } else {
        return next();
    }
}

module.exports = userRecordameMiddleware;
