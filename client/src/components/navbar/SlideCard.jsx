import React from 'react';
import './SlideCard.scss';
import { Link } from 'react-router-dom';

const SlideCard = ({ item }) => {
  return (
    
        
        <div className='slideCard' onClick={() => {window.location.href=`/product/${item._id}`}}>
          <Link to={`/product/${item._id}`} >
        <img src={item.images[0]} className="card-img-top"  alt="" />
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
                </Link>
        </div>
  
  )
}

export default SlideCard;
