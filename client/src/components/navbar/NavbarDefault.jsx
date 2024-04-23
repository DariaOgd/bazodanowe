import React, { useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import newRequest from "../../utils/newRequest";

function NavbarDefault() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser"); // Remove the user data from localStorage
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="nav">
      <Container fluid>
        <Navbar.Brand href="#">Logo</Navbar.Brand>
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
                placeholder="Szukaj"
                className="me-2"
                aria-label="Szukaj"
              />
              <Button variant="outline-success">Szukaj</Button>
            </Form>
          </Nav>
          {currentUser ? (
            <div className="dropdown ml-auto"> {/* Add ml-auto class to align dropdown to the right */}
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
              >
                {currentUser?.name}
              </button>
              <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''} dropdown-menu-end`} aria-labelledby="dropdownMenuButton">
                {/* Add "dropdown-menu-right" class to align the dropdown to the right */}
                {/* Add custom CSS class to handle overflow-x */}
                <li className="custom-dropdown-item"><a className="dropdown-item" href="#">Dodaj produkt</a></li>
                <li className="custom-dropdown-item"><a className="dropdown-item" href="#">Zamówienia</a></li>
                <li className="custom-dropdown-item"><hr className="dropdown-divider" /></li>
                <li className="custom-dropdown-item">
                  <Button variant="outline-danger" className="dropdown-item" onClick={handleLogout}>
                    Wyloguj się
                  </Button>
                </li>
                
              </ul>
            </div>
          ) : (
            <Button variant="outline-success" href="/login">
              Zaloguj się
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDefault;
