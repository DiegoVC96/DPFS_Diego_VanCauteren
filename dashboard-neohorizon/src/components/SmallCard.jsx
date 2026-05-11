import React from 'react';

function SmallCard({ title, total, icon, color }) {
    return (
        <div className={`card-simple border-${color}`}>
            <div className="card-body">
                <i className={`fas ${icon} icon-neon text-${color}`}></i>
                <h5 className="font-tech">{title}</h5>
                <p className="total-number">{total}</p>
            </div>
        </div>
    );
}

export default SmallCard;
