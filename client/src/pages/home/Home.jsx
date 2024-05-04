import React, { useState } from "react";
import "./Home.scss";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/navbar/ProductCard";
import { products } from "../../testdata.js";

function Home() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [sort, setSort] = useState("dateAdded");
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
            <NavbarDefault />
            <div className="container">
                <h1 id='greeting'>Witaj {currentUser?.name}!</h1>
                <div className="top-section">
                    <div className="sort-section">
                        <div className="left">
                            {/* <span>Zakres cenowy</span>
                            <input type="" placeholder="min"></input>
                            <input type="" placeholder="max"></input>
                            <button>Zastosuj</button> */}
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
                        {products
                            .filter(product => !selectedCategory || product.category === selectedCategory)
                            .map(product => (
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
