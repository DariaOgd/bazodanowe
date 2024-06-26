import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import upload from "../../utils/upload"; // Import your upload function
import "./Edit.scss";
import Footer from "../../components/Footer";

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

  const handleUpload = async (e) => {
    setUploading(true);
    const files = e.target.files;
    const images = [];
    for (const file of files) {
      const url = await upload(file); // Upload each file using the upload function
      images.push(url);
    }
    setProduct({
      ...product,
      images: images,
    });
    setUploading(false);
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
  const bookStates = ["new", "used", "broken"];

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
              <div className="images">
                <div className="imagesInputs">
                  <label htmlFor="file">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleUpload}
                  />
                </div>
                <button>
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
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
              <label htmlFor="">State</label>
              <select className="form-select" aria-label="Default select example" name="state" onChange={handleChange}>
                {bookStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Edit;
