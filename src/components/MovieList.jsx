import { useEffect, useState } from "react";
import MovieCard from './MovieCard'; 

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    // handle movie request
    const fetchMovie = async () => {
        const url = 'https://movies-api14.p.rapidapi.com/shows';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '3b40bf6b74msh9343759e7b91124p179af9jsn22a58fc624d9',
                'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setMovies(result.movies);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    console.log("All movies", movies);
    return (
        <div className="container">
            {movies.map((movie, index) => {
                return (
                    <MovieCard
                        title={movie.title}
                        img={movie.poster_path}
                        description={movie.overview}
                        rating={movie.rating}
                        key={index}
                    />
                );
            })}
        </div>
    );
};

export default MovieList;
