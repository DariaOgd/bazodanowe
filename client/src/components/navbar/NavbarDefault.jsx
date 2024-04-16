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

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Paperback paradise</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto ms-3"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Jeden</Nav.Link>
            <Nav.Link href="#action2">Dwa</Nav.Link>
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
            <>
            <span>{currentUser?.name}</span>
            <Button variant="outline-danger ms-4" onClick={handleLogout}>Wyloguj się</Button>
            </>
          ) : (
            <Button variant="outline-success" href="/login">Zaloguj się</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default NavbarDefault;