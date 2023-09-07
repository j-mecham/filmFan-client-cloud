import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export function FavoriteMovies({ profile, movies, user, setUser, token }) {
    console.log("movies ", profile.FavoriteMovies)
    const favoriteMovies = movies.filter((m) =>
        profile.FavoriteMovies.includes(m.id)
    );

    console.log("favs: ", favoriteMovies)

    if (favoriteMovies.length === 0) {
        return <div>Your favorite movies will be displayed here! Go ahead and<span> </span>
            <Link
                //add styling here
                to={`/`}>
                <span>add a few!</span>
            </Link>
        </div>;
    }

    return (
        <Row>
            {favoriteMovies.map((movie) => (
                <Col className="mb-4" key={movie.id} md={3}>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        user={user}
                        setUser={setUser}
                        token={token}
                    />
                </Col>
            ))}
        </Row>
    );
}