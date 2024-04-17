import React, { useState } from "react";
import "./Home.scss";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import { useNavigate } from "react-router-dom";

function Home() {

    return (
    <div>
        <NavbarDefault></NavbarDefault>
    </div>
    )
}

export default Home;