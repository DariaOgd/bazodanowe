import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import newRequest from "../../utils/newRequest"; // Make sure the path to your request utility is correct

import "./Navbar.scss"; // Ensure your SCSS or CSS path is correct

function NavbarDefault({ setSearchQuery }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(""); 

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout"); // Adjust according to your API
      localStorage.removeItem("currentUser");
      navigate("/"); // Redirects to the home page after logout
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value); // Assuming setSearchQuery does something meaningful in your app
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="nav">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src="../minilogo.png" width="40" height="40" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto ms-3" style={{ maxHeight: '80px' }} navbarScroll>
            <Form className="d-flex ms-4">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchInput}
                onChange={handleSearch}
              />
            </Form>
          </Nav>
          <Nav.Link className="cart" as={Link} to="/shopping-cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Nav.Link>
          {currentUser ? (
            <div className="dropdown ml-auto">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {currentUser.name}
              </button>
              <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''} dropdown-menu-end`} aria-labelledby="dropdownMenuButton">
                <li className="custom-dropdown-item"><Link className="dropdown-item" to="/add">Add a new product</Link></li>
                <li className="custom-dropdown-item"><Link className="dropdown-item" to="#">Your orders</Link></li>
                <li className="custom-dropdown-item"><Link className="dropdown-item" to={`/profile/${currentUser._id}`}>Your profile</Link></li>
                <li className="custom-dropdown-item"><hr className="dropdown-divider" /></li>
                <li className="custom-dropdown-item">

                
                  <Button variant="outline-danger" className="dropdown-item" id="logout-button" onClick={handleLogout}>
                   Log out

                  </Button>
                </li>
              </ul>
            </div>
          ) : (
            <Button variant="outline-success" id="loginbtn" as={Link} to="/login">
              Log in
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDefault;
