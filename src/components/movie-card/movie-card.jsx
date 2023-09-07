import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card
            className="h-100"
            style={{ color: 'white' }}
            border="light"
        >
            <Card.Img variant="top" src={movie.image} />
            <Card.Body
                className="d-flex flex-column justify-content-between"
            >
                <div className="mb-2">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.director}</Card.Text>
                </div>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button
                        variant="primary"
                    //class="align-self-end"
                    >
                        Open
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

// Prop constraints for movie-card
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
};