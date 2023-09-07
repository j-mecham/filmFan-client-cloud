import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [viewMovies, setViewMovies] = useState(movies);

    useEffect(() => {
        if (!token) {
            console.log("no token")
            return;
        }

        fetch("https://filmfanattic-8d1d52c1e608.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                console.log(movies);
                const moviesFromApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        image: movie.ImagePath,
                        director: movie.Director.Name,
                        genre: movie.Genre.Name,
                        description: movie.Description,
                        year: movie.Release_Year,
                        actors: movie.Actors
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    useEffect(() => {
        setViewMovies(movies);
    }, [movies]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear("user", "token");
                }}
                onSearch={(query) => {
                    setViewMovies(
                        movies.filter((movie) =>
                            movie.title.toLowerCase().includes(query.toLowerCase())
                        )
                    );
                }}

            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView
                                            onLoggedIn={(user, token) => {
                                                setUser(user)
                                                setToken(token)
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user)
                                            setToken(token)
                                        }} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <>
                                {user ? (
                                    <Col>
                                        <ProfileView
                                            loggedOut={() => {
                                                setUser(null);
                                                setMovies(null);
                                                localStorage.clear();
                                            }}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                            movies={movies}
                                        //updatedUser={updatedUser}
                                        />
                                    </Col>
                                ) : (
                                    <Navigate to="/login" replace />
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            movies={movies}
                                            user={user}
                                            setUser={setUser}
                                            token={token}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
