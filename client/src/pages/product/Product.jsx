import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import Navbar from "../../components/navbar/Navbar";

import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Product.scss";
import { useCart } from "../../context/cartContext";
import Slide from "../../components/navbar/Slide.jsx";
import Footer from "../../components/Footer.jsx";

function Product() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [showAlert, setShowAlert] = useState(false);
  const { addToCart } = useCart(); // Use the addToCart hook

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await newRequest.get("/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      newRequest.get(`/products/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  console.log("user id - seller");
  console.log(userId);
  console.log("user id - logged");
 
  
  const logged = currentUser?._id;
  console.log(logged)
  const ifuserSeller = userId === logged;
  const handleDeleteProduct = async () => {
    try {
      await newRequest.delete(`/products/${id}`);
      setShowAlert(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(id);
      window.location.reload();
      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="product">
      <Navbar />
      {isLoading || isLoadingUser ? (
        "Loading..."
      ) : error || errorUser ? (
        "Something went wrong!"
      ) : (
        <div className="containerProduct">
          <div className="left">
            {data.images && data.images.length > 0 && (
              <img src={data.images[0]} alt="Product Image" />
            )}
          </div>
          <div className="right">
            {ifuserSeller && (
              <div className="icons">
                <FontAwesomeIcon
                  id="trash-icon"
                  icon={faTrash}
                  title="Delete this product"
                  onClick={handleDeleteProduct}
                />
                <Link to={`/edit/${id}`}>
                  <FontAwesomeIcon
                    id="edit-icon"
                    title="Edit Product"
                    icon={faEdit}
                  />
                </Link>
              </div>
            )}

            <div className="info"></div>

            <p className="username">
              Seller:
              <Link
                id="seller-link"
                title="Visit user's profile"
                to={`/profile/${data.userId}`}
              >
                {dataUser?.name || "Seller"}
              </Link>
            </p>

            <h1>{data.title}</h1>
            <p className="state">State: {data.state}</p>
            <p className="category">{data.category}</p>

            <p className="desc">{data.desc}</p>
            <div className="price">
              <h2>${data.price}</h2>
            </div>
            <div className="add-basket">
              {data.bought ? (
                <p className="bought-message">This product has been bought</p>
              ) : (
                <button onClick={handleAddToCart}>Add to cart</button>
              )}
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <Stack>
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Product has been deleted successfully.
          </Alert>
        </Stack>
      )}

      <div className="product-slider">
        <span id="slider-heading">You may also like:</span>
        <div className="slider">
          <Slide currentProductId={id} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
