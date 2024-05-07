import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import NavbarDefault from "../../components/navbar/NavbarDefault";

import "./Product.scss"
function Product() {
  const { id } = useParams();

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
  

  return (
    
    <div className="product">
      <NavbarDefault></NavbarDefault>
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
            <div className="info">
              
            </div>
        
            {dataUser && <p className="username">Seller: {dataUser.name}</p>}
            
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
    </div>
  );
}  
export default Product;
