const db = require('../../database/models');

const productsApiController = {
    list: async (req, res) => {
        try {
            let limit = 10;
            let page = parseInt(req.query.page) || 1;
            let offset = (page - 1) * limit;

            const [productsData, categories] = await Promise.all([
                db.Product.findAndCountAll({
                    include: ['category'],
                    limit,
                    offset
                }),
                db.ProductCategory.findAll({ include: ['products'] })
            ]);

            const countByCategory = {};
            categories.forEach(cat => countByCategory[cat.name] = cat.products.length);

            const products = productsData.rows.map(p => ({
                id: p.id,
                name: p.name,
                description: p.description,
                categories: [p.category.name],
                detail: `/api/products/${p.id}`
            }));

            res.json({
                count: productsData.count,
                countByCategory,
                next: (offset + limit) < productsData.count ? `/api/products/?page=${page + 1}` : null,
                previous: page > 1 ? `/api/products/?page=${page - 1}` : null,
                products: products
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: ['category', 'brand', 'variants']
            });

            if (!product) {
                return res.status(404).json({
                    meta: { status: 404, msg: 'Producto no encontrado' }
                });
            }

            const productData = {
                ...product.toJSON(),
                categories: [product.category ? product.category.name : 'Sin categoría'],
                imageUrl: `/images/products/${product.image}`
            };

            return res.json({
                product: productData
            });

        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener el detalle' });
        }
    },

    destroy: async (req, res) => {
        try {
            await db.Product.destroy({ where: { id: req.params.id } });
            return res.json({ msg: 'Producto eliminado correctamente' });
        } catch (error) {
            return res.status(500).json({ error: 'No se pudo eliminar el producto' });
        }
    },

    update: async (req, res) => {
        try {
            await db.Product.update(req.body, { where: { id: req.params.id } });
            return res.json({ msg: 'Producto actualizado' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar' });
        }
    },

    store: async (req, res) => {
        try {
            const newProduct = await db.Product.create(req.body);
            return res.json({
                msg: 'Producto creado con éxito',
                product: newProduct
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error al crear el producto' });
        }
    }

};

module.exports = productsApiController;
