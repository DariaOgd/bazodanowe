import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
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
      {isLoading || isLoadingUser ? (
        "Loading..."
      ) : error || errorUser ? (
        "Something went wrong!"
      ) : (
        <div className="containerProduct">
          <div className="left">
            <div className="category">          
              <p>Category: {data.category}</p>
            </div>
            {data.images && data.images.length > 0 && (
              <img src={data.images[0]} alt="Product Image" />
            )}
          </div>
          <div className="right">
            {dataUser && <p>User Name: {dataUser.name}</p>}
            <p>State: {data.state}</p>
            <h1>{data.title}</h1>
            <p>{data.desc}</p>
            <div className="price">
              <h2>$ {data.price}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  
export default Product;