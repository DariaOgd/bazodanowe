import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import "./Edit.scss";

const Edit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    category: "",
    images: [],
    desc: "",
    price: "",
    state: "",
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await newRequest.get(`/products/single/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.put(`/products/${id}`, product);
      queryClient.invalidateQueries(["products"]);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const bookCategories = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Romance",
    "Fantasy",
    "Science Fiction",
    "Thriller",
    "Horror",
  ];

  return (
    <div className="edit">
      <NavbarDefault />
      <div className="container">
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="sections">
            <div className="info">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Product title"
                value={product.title}
                onChange={handleChange}
              />
              <label htmlFor="category">Category</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                {bookCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                placeholder="Product description"
                value={product.desc}
                onChange={handleChange}
                rows="6"
              ></textarea>
              <button type="submit">Save Changes</button>
            </div>
            <div className="details">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                min="1"
                placeholder="Product price"
                value={product.price}
                onChange={handleChange}
              />
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                placeholder="Product state"
                value={product.state}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
