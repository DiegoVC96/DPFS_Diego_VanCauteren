const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const usersController = {
    login: (req, res) => {
        res.render('users/login');
    },

    loginProcess: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const userToLogin = users.find(user => user.email === req.body.email);

        if (userToLogin) {
            const isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isPasswordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 * 24 * 30 });
                }
                return res.redirect('/users/profile');
            }
        }

        return res.render('users/login', {
            errors: { email: { msg: 'Credenciales inválidas' } }
        });
    },

    profile: (req, res) => {
        res.render('users/profile', { user: req.session.userLogged });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    register: (req, res) => {
        res.render('users/register');
    },

    processRegister: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        
        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name: req.body.name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            category: 'customer',
            image: req.file ? req.file.filename : 'default-avatar.png'
        };

        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        
        res.redirect('/users/login');
    }
};

module.exports = usersController;
