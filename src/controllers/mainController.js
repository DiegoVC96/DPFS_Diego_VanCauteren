const mainController = {
    home: (req, res) => {
        res.render('index'); // Renderiza index.ejs
    },
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    }
};