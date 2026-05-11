const db = require('../../database/models');

const usersApiController = {
    list: async (req, res) => {
        try {
            let limit = 10;
            let page = parseInt(req.query.page) || 1;
            let offset = (page - 1) * limit;

            const { count, rows } = await db.User.findAndCountAll({
                attributes: ['id', 'firstName', 'lastName', 'email'],
                limit,
                offset
            });

            const usersData = rows.map(user => ({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                detail: `/api/users/${user.id}`
            }));

            res.json({
                count: count,
                next: (offset + limit) < count ? `/api/users/?page=${page + 1}` : null,
                previous: page > 1 ? `/api/users/?page=${page - 1}` : null,
                users: usersData
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

     detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ['password', 'user_category_id', 'category_id'] }
            });

            if (!user) {
                return res.status(404).json({
                    meta: { status: 404, msg: 'Usuario no encontrado' }
                });
            }

            const userData = {
                ...user.toJSON(),
                imageUrl: `/images/users/${user.image}`
            };

            return res.json({
                user: userData
            });

        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener el detalle del usuario' });
        }
    }
};

module.exports = usersApiController;
