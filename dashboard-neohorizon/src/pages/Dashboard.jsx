import React, { useState, useEffect } from 'react';
import '../assets/css/Dashboard.css';

const SmallCard = ({ title, total, icon, color }) => (
    <div className={`card-simple border-${color}`}>
        <div className="card-body">
            <i className={`fas ${icon} icon-neon`}></i>
            <h5 className="font-tech">{title}</h5>
            <p className="total-number">{total}</p>
        </div>
    </div>
);

function Dashboard() {
    // --- ESTADOS ---
    const [products, setProducts] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const [categories, setCategories] = useState({});
    const [lastItem, setLastItem] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category_id: 1 });

    // --- EFECTOS ---
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                console.log("Datos de Productos:", data);
                setProducts(data.products);
                setCategories(data.countByCategory);
                setLastItem(data.products[data.products.length - 1]);
            });

        fetch('http://localhost:3000/api/users')
            .then(res => res.json())
            .then(data => {
                console.log("Datos de Usuarios:", data)
                setUsersCount(data.count)});
    }, []);

    // Crear
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            setProducts([data.product, ...products]);
            setShowCreate(false);
            setNewProduct({ name: '', price: '', description: '', category_id: 1 });
            alert("Sistema NeoHorizon: Hardware ingresado.");
        });
    };

    // Editar
    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/products/${editingProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingProduct)
        })
        .then(res => res.json())
        .then(() => {
            const updatedList = products.map(p => p.id === editingProduct.id ? editingProduct : p);
            setProducts(updatedList);
            setEditingProduct(null);
            alert("Producto actualizado.");
        });
    };

    // Eliminar
    const deleteProduct = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => {
                setProducts(products.filter(p => p.id !== id));
            });
        }
    };

    // --- RENDERIZADO ---
    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="neon-text font-tech">NEOHORIZON ADMIN PANEL</h1>
                <button className="btn-primary btn-add" onClick={() => setShowCreate(true)}>
                    + NUEVO PRODUCTO
                </button>
            </header>

            {/* METRICAS */}
            <div className="row">
                <SmallCard title="PRODUCTOS" total={products.length} color="blue" icon="fa-box" />
                <SmallCard title="USUARIOS" total={usersCount} color="green" icon="fa-users" />
                <SmallCard title="CATEGORÍAS" total={Object.keys(categories).length} color="purple" icon="fa-tags" />
            </div>

            {/* DETALLES Y CATEGORIAS */}
            <div className="main-content-grid">
                <section className="card-large">
                    <h3 className="font-tech">ÚLTIMO PRODUCTO</h3>
                    {lastItem && (
                        <div className="last-item-detail">
                            <img src={`http://localhost:3000/images/products/${lastItem.image}`} alt="Last item" />
                            <h4>{lastItem.name}</h4>
                            <p>{lastItem.description}</p>
                        </div>
                    )}
                </section>

                <section className="card-large">
                    <h3 className="font-tech">PRODUCTOS POR CATEGORÍA</h3>
                    <ul className="category-list">
                        {Object.keys(categories).map(cat => (
                            <li key={cat}>{cat}: <strong>{categories[cat]}</strong></li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* TABLA DE PRODUCTOS */}
            <section className="card-large table-section">
                <h3 className="font-tech">LISTADO DE INVENTARIO</h3>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>ID</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>#{p.id}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => setEditingProduct(p)}>EDITAR</button>
                                    <button className="btn-delete" onClick={() => deleteProduct(p.id)}>BORRAR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {showCreate && (
                <div className="edit-form-overlay">
                    <form className="edit-form" onSubmit={handleCreateSubmit}>
                        <h3 className="font-tech neon-text">NUEVO HARDWARE</h3>
                        <input type="text" name="name" placeholder="Nombre" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required />
                        <input type="number" name="price" placeholder="Precio" onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required />
                        <textarea name="description" placeholder="Descripción" onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required />
                        <div className="btn-group">
                            <button type="submit" className="btn-primary">CREAR</button>
                            <button type="button" onClick={() => setShowCreate(false)} className="btn-cancel">VOLVER</button>
                        </div>
                    </form>
                </div>
            )}

            {editingProduct && (
                <section className="edit-form-overlay">
                    <form className="edit-form" onSubmit={handleSubmitUpdate}>
                        <h3 className="font-tech neon-text">EDITAR PRODUCTO</h3>
                        <input type="text" name="name" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                        <input type="number" name="price" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                        <div className="btn-group">
                            <button type="submit" className="btn-primary">GUARDAR</button>
                            <button type="button" onClick={() => setEditingProduct(null)} className="btn-cancel">CANCELAR</button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
}

export default Dashboard;
