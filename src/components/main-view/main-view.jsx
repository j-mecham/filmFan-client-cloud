import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Scott Pilgrim vs. the World",
            image:
                "https://m.media-amazon.com/images/I/517XbXyIwRL._AC_UF894,1000_QL80_.jpg",
            director: "Edgar Wright",
            genre: "Action",
            description: "In a magically realistic version of Toronto, a young man must defeat his new girlfriend's seven evil exes one by one in order to win her heart.",
            year: "2010",
            cast: "Michael Cera, Mary Elizabeth Winstead"
        },
        {
            id: 1,
            title: "The Grand Budapest Hotel",
            image:
                "https://m.media-amazon.com/images/I/713kiC-8JhL._AC_UF894,1000_QL80_.jpg",
            director: "Wes Anderson",
            genre: "Comedy",
            description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
            year: "2014",
            cast: "Ralph Fiennes, Tony Revolori"
        },
        {
            id: 1,
            title: "Everything Everywhere All at Once",
            image:
                "https://m.media-amazon.com/images/I/A1f7vq1AwuL._AC_UF894,1000_QL80_.jpg",
            director: "Daniels",
            genre: "Action",
            description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
            year: "2022",
            cast: "Michelle Yeoh, Ke Huy Quan"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};