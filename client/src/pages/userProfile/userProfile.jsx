import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import ProductCard from "../../components/navbar/ProductCard";
import "./userProfile.scss";
import Footer from "../../components/Footer.jsx";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await newRequest.get(`/users/${id}`);
        setUser(userResponse.data);
      } catch (err) {
        setError("Error fetching user details: " + err.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const productsResponse = await newRequest.get(`/products?userId=${id}`);
        setProducts(productsResponse.data);
      } catch (err) {
        setError("Error fetching user products: " + err.message);
      }
    };

    fetchUser();
    fetchProducts();
    setLoading(false);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <NavbarDefault />
      <div className="profile-container">
        {user && (
          <div className="profile-details"> 
            <img src="../user-icon.png" id="user-icon" alt="userIcon"/>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        )}
        <div className="message-user">
          <button>Message</button>
        </div>
        <div className="user-products">
          
          <div className="products-list">
            {products.length > 0 ? (
              products.map(product => <ProductCard key={product._id} item={product} />)
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default UserProfile;
