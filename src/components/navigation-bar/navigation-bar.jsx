import { Container, Nav, Navbar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
    const location = useLocation()
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
                                    className={location.pathname === "/login" ? 'active-nav' : ''}
                                >
                                    Login
                                </Nav.Link>
                                <Nav.Link
                                    as={Link} to="/signup"
                                    style={{
                                        color: 'white'
                                    }}
                                    className={location.pathname === "/signup" ? 'active-nav' : ''}

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
                                        color: 'white',
                                    }}
                                    className={location.pathname === "/" ? 'active-nav' : ''}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    as={Link} to="/users"
                                    style={{
                                        color: 'white'
                                    }}
                                    className={location.pathname === "/users" ? 'active-nav' : ''}
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
                    {user && location.pathname === "/" && (
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
