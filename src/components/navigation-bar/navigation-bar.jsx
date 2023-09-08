import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {

    return (
        <Navbar
            sticky="top"
            expand="lg"
            style={{
                backgroundColor: '#8b0000'

            }}
        >
            <Container>
                <Navbar.Brand
                    as={Link} to="/"
                    style={{
                        color: 'white'
                    }}
                >
                    Film FanAttic
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="me-auto"
                        style={{ color: 'white' }}
                    >
                        {!user && (
                            <>
                                <Nav.Link
                                    as={Link} to="/login"
                                    style={{
                                        color: 'white'
                                    }}
                                >
                                    Login
                                </Nav.Link>
                                <Nav.Link
                                    as={Link} to="/signup"
                                    style={{
                                        color: 'white'
                                    }}
                                >
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link
                                    as={Link} to="/"
                                    style={{
                                        color: 'white'
                                    }}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    as={Link} to="/users"
                                    style={{
                                        color: 'white'
                                    }}
                                >
                                    Profile
                                </Nav.Link>
                                <Nav.Link
                                    onClick={onLoggedOut}
                                    style={{
                                        color: 'white'
                                    }}
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    {user && (
                        <Form className="d-flex">
                            <Form.Control
                                style={{ color: 'white' }}
                                type="text"
                                placeholder="Search"
                                className="md-2"
                                aria-label="Search"
                                onChange={onSearch}
                            />
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
