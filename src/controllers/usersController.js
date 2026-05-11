const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const userController = {
    // 1. FORMULARIO DE LOGIN 
    login: (req, res) => {
        res.render('users/login');
    },

    // 2. LOGIN 
    loginProcess: async (req, res) => {
    try {

        const resultValidation = validationResult(req);

        // Validar errores de FORMATO 
        if (!resultValidation.isEmpty()) {
            return res.render('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const userToLogin = await db.User.findOne({ 
            where: { email: req.body.email } 
        });

        if (!userToLogin) {
            return res.render('users/login', {
                errors: { email: { msg: 'Este email no está registrado' } }
            });
        }

        console.log("Validando contraseña...");
        console.log("Password ingresado:", req.body.password);
        console.log("Hash en base de datos:", userToLogin.password);
        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, userToLogin.password);
        console.log("¿Es correcta?:", isPasswordCorrect);

        if (isPasswordCorrect) {
            
            const user = userToLogin.get({ plain: true });
            delete user.password;
            req.session.userLogged = user;

            // Galletita "Recordame"
            if (req.body.remember) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
            }

            // REDIRECCIÓN MANUAL
            return res.redirect('/'); 
        } else {
            return res.render('users/login', {
                errors: { password: { msg: 'La contraseña es incorrecta' } }
            });
        }

        } catch (error) {
            return res.send(error);
        }
    },


    // 3. FORMULARIO DE REGISTRO 
    register: (req, res) => {
        res.render('users/register');
    },

    // 4. REGISTRO
    processRegister: async (req, res) => {
    try {
        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            console.log("DETENIENDO REGISTRO: Hay errores de validación");
            return res.render('users/register', { 
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        console.log("PROCEDIENDO A CREAR USUARIO...");
        const newUser = await db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            category_id: 2, 
            image: req.file ? req.file.filename : 'default-avatar.png'
        });

        const userToSession = newUser.get({ plain: true });
        delete userToSession.password;
        req.session.userLogged = userToSession;

        return res.redirect('/'); 

        } catch (error) {
            console.log("ERROR EN DB:", error);
            res.send(error);
        }
    },



    // 5. PERFIL
    profile: async (req, res) => {
    try {
        const user = await db.User.findByPk(req.session.userLogged.id);
        
        if (!user) {
            return res.redirect('/users/login');
        }

        return res.render('users/profile', { user });

        } catch (error) { 
            return res.send(error); 
        }
    },


    updateProfile: async (req, res) => {
        try {
        const userId = req.session.userLogged.id;
        
        await db.User.update({
            firstName: req.body.firstName, 
            lastName: req.body.lastName,   
            email: req.body.email,
            image: req.file ? req.file.filename : req.session.userLogged.image
        }, {
            where: { id: userId }
        });

        const userUpdated = await db.User.findByPk(userId);
        
        const userPlain = userUpdated.get({ plain: true });    
        delete userPlain.password; // Por seguridad
        req.session.userLogged = userPlain;

        return res.redirect('/users/profile');

        } catch (error) {
        console.log(error);
        res.send("Error al actualizar el perfil");
        }
    },

    // 6. LOGOUT 
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = userController;
