import React from 'react'
import "./ProductCard.scss"
import {Link} from 'react-router-dom';

const ProductCard = ({item}) => {
  return (
    <Link to={`/product/${item._id}`} className='link'>
        <div className='productCard'>
            <img src={item.img} alt=""></img>
            <div className='info'>
                <div className="user">
                    <span>{item.username}</span>
                </div>
                <h2 id='title'>{item.title}</h2>
                <p>{item.desc}</p>
            </div>
            <hr/>
            <div className='details'></div>
                <h2 id='price'>${item.price}</h2>
        </div>
    </Link>
  )
}

export default ProductCard
