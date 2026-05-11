const fs = require('fs');
const path = require('path');

function userRecordameMiddleware(req, res, next) {
    // Si no hay nadie en sesión pero existe la cookie
    if (!req.session.userLogged && req.cookies.userEmail) {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        
        const userFromCookie = users.find(user => user.email === req.cookies.userEmail);

        if (userFromCookie) {
            delete userFromCookie.password;
            req.session.userLogged = userFromCookie;
        }
    }
    next();
}

module.exports = userRecordameMiddleware;
