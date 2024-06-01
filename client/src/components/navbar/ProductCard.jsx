import React from 'react';
import './ProductCard.scss';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { useCart } from "../../context/cartContext";

const ProductCard = ({ item }) => {
    const { id } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { addToCart } = useCart(); 
    const navigate = useNavigate(); 

    const handleAddToCart = async (e) => {
        e.stopPropagation(); 
        e.preventDefault();
        if (!currentUser) {
            alert("You must be logged in to add products to the cart.");
            navigate("/login");
            return;
          }
        try {
          await addToCart(item._id);
          window.location.reload()
          console.log('Product added to cart successfully!');
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      };


    return (
        <Link to={`/product/${item._id}`} className="link">
            <div className="card" >
                <img src={item.images[0]} className="card-img-top"  alt="" />
                <div className="card-body">
                    <div className="user">
                        <span className='user-name'>{item.username}</span>
                    </div>
                    <h5 className="card-title">{item.title}</h5>
                </div>
                
                <div className="card-footer d-flex justify-content-between align-items-spaceline">
                    <p>${item.price}</p>
                    <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </Link>
        
    );
};

export default ProductCard;
