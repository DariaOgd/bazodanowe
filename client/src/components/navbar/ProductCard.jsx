import React from 'react';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
    return (
        <Link to={`/product/${item._id}`} className="link">
            <div className="card" >
                <img src={item.img} className="card-img-top" height="200px"  alt="" />
                <div className="card-body">
                    <div className="user">
                        <span className='user-name'>{item.username}</span>
                    </div>
                    <h5 className="card-title">{item.title}</h5>
          
                    
                </div>
                <div className="card-footer d-flex justify-content-between align-items-spaceline">
                    <p>${item.price}</p>
                    <button className="btn">Add to Cart</button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
