import React, { useState } from "react";
import "./Home.scss";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/navbar/ProductCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

function Home() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [sort, setSort] = useState("newest"); // Default sorting type
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => newRequest.get("/products").then(res => res.data)
    });

    // Define sorting function
    const sortProducts = (products, sortingType) => {
        const sortedProducts = [...products];
        if (sortingType === "newest") {
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        return sortedProducts;
    };

    const sortedData = sortProducts(data || [], sort); // Initialize sortedData as an empty array if data is undefined

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    // Define categories
    const categories = ["Fiction", "Non-fiction", "Mystery", "Romance", "Fantasy", "Science Fiction", "Thriller", "Horror"];

    const filterByCategory = (category) => {
        setSelectedCategory(category);
    };

    const navigate = useNavigate();

    return (
        <div>
            <NavbarDefault setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery prop */}
            <div className="container">
                <h1 id='greeting'>Witaj {currentUser?.name}!</h1>
                <div className="top-section">
                    <div className="sort-section">
                        <div className="left">
                        </div>
                        <div className="right">
                            <span className="sortBy">Sortuj:</span>
                            <span className="sortType">{sort === "newest" ? "Od najnowszych" : "Od najstarszych"}</span>
                            <img src="../downarrow.png" alt="" onClick={() => setOpen(!open)}></img>
                            {open && (
                                <div className="rightMenu">
                                    <span onClick={() => reSort("newest")}>Najnowsze</span>
                                    <span onClick={() => reSort("oldest")}>Najstarsze</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="sidebar">
                        <h3>Kategorie</h3>
                        <ul>
                            {categories.map((category, index) => (
                                <li key={index} onClick={() => filterByCategory(category)}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="books">
                        <div className="cards">
                            {isLoading
                                ? "loading"
                                : error
                                ? "Something went wrong"
                                : sortedData
                                    .filter((product) => 
                                        (!selectedCategory || product.category === selectedCategory) && // Filter by selected category
                                        (searchQuery.trim() === "" || // Filter by search query (case insensitive)
                                        (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) // Null check for product.title
                                    ))
                                    .map((product) => (
                                        <ProductCard key={product._id} item={product} />
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
