import React, { useReducer, useState } from "react";
import { productReducer, INITIAL_STATE } from "../../reducers/productReducer";
import upload from "../../utils/upload";
import Navbar from "../../components/navbar/Navbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./Add.scss";
import Footer from "../../components/Footer";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get current user
  console.log("Current User:", currentUser); // Log current user

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: images });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product) => {
      const payload = { ...product, userId: currentUser._id }; // Include userId in the request
      console.log("Payload being sent:", payload); // Log payload
      return newRequest.post("/products", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/");
      window.location.reload()
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  const bookCategories = ["Fiction", "Non-fiction", "Mystery", "Romance", "Fantasy", "Science Fiction", "Thriller", "Horror"];
  const bookStates = ["new", "used", "broken"];

  return (
    <div className="">
      <Navbar />
      <div className="add">
        <div className="container">
          <h1>Add New Product</h1>
          <div className="sections">
            <div className="info">
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Product title"
                onChange={handleChange}
              />
              <label htmlFor="">Category</label>
              <select className="form-select" aria-label="Default select example" name="category" onChange={handleChange}>
                {bookCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="images">
                <div className="imagesInputs">
                  <label htmlFor="">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <button onClick={handleUpload}>
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <label htmlFor="">Description</label>
              <textarea
                name="desc"
                placeholder="Product description"
                cols="0"
                rows="6"
                onChange={handleChange}
              ></textarea>
              <button onClick={handleSubmit}>Create</button>
            </div>
            <div className="details">
              <label htmlFor="">Price</label>
              <input
                type="number"
                name="price"
                min="1"
                placeholder="Product price"
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Add;
