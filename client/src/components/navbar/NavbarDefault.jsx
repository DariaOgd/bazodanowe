import React, { useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import newRequest from "../../utils/newRequest";

function NavbarDefault({ setSearchQuery }) { // Receive setSearchQuery as prop
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State for search input

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value); // Update search input state
    setSearchQuery(e.target.value); // Pass search query to parent component
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="nav">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="../minilogo.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
            //href="/"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto ms-3"
            style={{ maxHeight: '80px' }}
            navbarScroll
          >
            <Form className="d-flex ms-4">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Szukaj"
                value={searchInput} // Bind search input value to state
                onChange={handleSearch} // Call handleSearch function on change
              />
              
            </Form>
          </Nav>
          {currentUser ? (
            <div className="dropdown ml-auto">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {currentUser?.name}
              </button>
              <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''} dropdown-menu-end`} aria-labelledby="dropdownMenuButton">
                <li className="custom-dropdown-item"><a className="dropdown-item" href="/add">Add a new product</a></li>
                <li className="custom-dropdown-item"><a className="dropdown-item" href="#">Your orders</a></li>
                <li className="custom-dropdown-item"><hr className="dropdown-divider" /></li>
                <li className="custom-dropdown-item">
                  <Button variant="outline-danger" className="dropdown-item" onClick={handleLogout}>
                   Log out
                  </Button>
                </li>
              </ul>
            </div>
          ) : (
            <Button variant="outline-success" href="/login">
              Log in
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDefault;
