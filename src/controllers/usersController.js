const db = require('../database/models');
const bcryptjs = require('bcryptjs');

const userController = {
    // 1. FORMULARIO DE LOGIN 
    login: (req, res) => {
        res.render('users/login');
    },

    // 2. LOGIN 
    loginProcess: async (req, res) => {
    try {
        console.log("--- INTENTO DE LOGIN ---");
        console.log("Email recibido:", req.body.email);

        // 1. Buscar al usuario
        const userToLogin = await db.User.findOne({ 
            where: { email: req.body.email } 
        });

        if (!userToLogin) {
            console.log("--- USUARIO NO ENCONTRADO EN LA DB ---");
            return res.render('users/login', {
                errors: { email: { msg: 'Este email no está registrado' } }
            });
        }

        // 2. Validar contraseña
        console.log("Validando contraseña...");
        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, userToLogin.password);

        if (isPasswordCorrect) {
            console.log("--- LOGIN EXITOSO ---");
            
            // Guardar en sesión (sin el password)
            const user = userToLogin.get({ plain: true });
            delete user.password;
            req.session.userLogged = user;

            // Galletita "Recordame"
            if (req.body.remember) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
            }

            // REDIRECCIÓN MANUAL (Aseguramos que el flujo termine acá)
            return res.redirect('/'); 
        } else {
            console.log("--- CONTRASEÑA INCORRECTA ---");
            return res.render('users/login', {
                errors: { password: { msg: 'La contraseña es incorrecta' } }
            });
        }

        } catch (error) {
            console.log("--- ERROR CRÍTICO EN EL CONTROLADOR ---");
            console.log(error);
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
        // 1. VERIFICACION
        const userExists = await db.User.findOne({ where: { email: req.body.email } });
        if (userExists) {
            return res.render('users/register', {
                errors: { email: { msg: 'Este email ya está registrado' } },
                oldData: req.body
            });
        }

        // 2. CREAR
        const newUser = await db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            category_id: 2,
            image: req.file ? req.file.filename : 'default-avatar.png'
        });

        // 3. AUTO-LOGIN
        const userToSession = newUser.get({ plain: true });
        delete userToSession.password;
        req.session.userLogged = userToSession;

        // 4. REDIRECCIÓN AL INICIO
        return res.redirect('/'); 

        } catch (error) {
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
