import React, { useState } from "react";
import "./Home.scss";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/navbar/ProductCard";
import { products } from "../../testdata.js"

function Home() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [sort, setSort] = useState("dateAdded")
    const [open, setOpen] = useState(false)

    const reSort = (type) =>{
        setSort(type)
        setOpen(false)
    }

    return (
    <div>
        <NavbarDefault></NavbarDefault>
        <div className="container">
            <h1 id='greeting'>Witaj {currentUser?.name}! </h1>
            <div className="menu">
                <div className="left">
                    <span>Zakres cenowy</span>
                    <input type="" placeholder="min"></input>
                    <input type="" placeholder="max"></input>
                    <button>Zastosuj</button>
                </div>
                <div className="right">
                    <span className="sortBy">Sortuj:</span>
                    <span className="sortType">{sort === "newest" ? "Od najnowszych" : "Od najstarszych"}</span>
                    <img src="../downarrow.png" alt="" onClick={()=>setOpen(!open)}></img>
                    {open && (
                        <div className="rightMenu">
                            <span onClick={() => reSort("newest")}>Najnowsze</span>
                            <span onClick={() => reSort("oldest")}>Najstarsze</span>
                        </div>
                     )}
                </div>
            </div>
            <div className="cards">
                {console.log(products)}
                {products.map(product => {
                    return (
                        <ProductCard key={product._id} item={product} />
                        );
                    })}

            </div>
        </div>
    </div>
    )
}

export default Home;