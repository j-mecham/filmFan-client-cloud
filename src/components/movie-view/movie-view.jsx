import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    const [isFavorite, setIsFavorite] = useState(
        user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
    );

    useEffect(() => {
        setIsFavorite(
            user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
        );
    }, [user, movie]);

    const handleToggleFavorite = () => {
        fetch(
            `https://filmfanattic-8d1d52c1e608.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
            {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                console.log("1 " + response);
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((updatedUserResponse) => {
                console.log("2 ", updatedUserResponse);
                setUser(updatedUserResponse);
                console.log("3 " + updatedUserResponse.FavoriteMovies.some((fm) => fm == movie.id))
                setIsFavorite(
                    updatedUserResponse.FavoriteMovies.some((fm) => fm == movie.id)
                );
            })
            .catch((error) => {
                const contentType = error.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    error
                        .json()
                        .then((errorMessage) =>
                            alert(`An error occurred: ${errorMessage}`)
                        );
                } else {
                    error.text().then((errorMessage) => alert(errorMessage));
                }
            });
    };


    return (
        <div>
            {movie ? (
                <>
                    <Row className="mb-4">
                        <Col>
                            <h1>{movie.title}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-4" xs={12} sm={6} md={4}>
                            <div>
                                <img className="w-100" src={movie.image} />
                            </div>
                            <Button
                                variant={isFavorite ? 'danger' : 'success'}
                                onClick={handleToggleFavorite}
                                className="btn-block mr-1 mt-1 btn-lg"
                            >
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>
                        </Col>
                        <Col className="mb-4" xs={12} sm={6} md={8}>
                            <div>
                                <h4 className="first">Directed By: </h4>
                                <span>{movie.director}</span>
                            </div>
                            <div>
                                <h4>Genre: </h4>
                                <span>{movie.genre}</span>
                            </div>
                            <div>
                                <h4>Description: </h4>
                                <span>{movie.description}</span>
                            </div>
                            <div>
                                <h4>Release Year: </h4>
                                <span>{movie.year}</span>
                            </div>
                            <div>
                                <h4>Main Cast: </h4>
                                <span>{movie.actors.join(', ')}</span>
                            </div>
                            <Link to={`/`}>
                                <button className="back-button">Back</button>
                            </Link>
                        </Col>
                    </Row>
                </>
            ) : (
                <span>Movie not found</span>
            )}
        </div>
    );
};