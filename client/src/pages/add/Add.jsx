import React, { useReducer, useState } from "react";
import { productReducer, INITIAL_STATE } from "../../reducers/productReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./Add.scss";
const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

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
      return newRequest.post("/products", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/")
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  return (
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
            <input
              type="text"
              name="category"
              placeholder="Product category"
              onChange={handleChange}
            />
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
            <input
              type="text"
              name="state"
              placeholder="Product state"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
