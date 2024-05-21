import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Product.scss";
import axios from 'axios';

function Product() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [showAlert, setShowAlert] = useState(false);
  // const [cart, setCart] = useState([]);


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

  // const handleAddToCart = async () => {
  //   try {
  //     console.log('Product ID:', id); // Check if the product ID is correctly obtained
  //     await axios.post(`/cart/${id}`);
  //     console.log('Product added to cart successfully!');
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error);
  //   }
  // };
  

  return (
    <div className="product">
      <NavbarDefault />
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
                  icon={faTrash}
                  onClick={handleDeleteProduct}
                />
                <Link to={`/edit/${id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </div>
            )}

            <div className="info"></div>

            <p className="username">Seller: 
                  <Link to={`/profile/${data.userId}`}>{dataUser?.name || 'Seller'}</Link>
                </p>


            <h1>{data.title}</h1>
            <p className="state">State: {data.state}</p>
            <p className="category">{data.category}</p>

            <p className="desc">{data.desc}</p>
            <div className="price">
              <h2>${data.price}</h2>
            </div>
            <div className="add-basket">
              <button >Add to cart</button>
            </div>
          </div>
        </div>
      )}
      {/* {showAlert && (
        <Stack >
          <Alert
            severity="success"
            onClose={() => setShowAlert(false)}
          >
            Product has been deleted successfully.
          </Alert>
        </Stack>
      )} */}
    </div>
  );
}

export default Product;
