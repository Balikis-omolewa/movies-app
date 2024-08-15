import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const cachedMovie = localStorage.getItem(`movie_${id}`);
            if (cachedMovie) {
                setMovie(JSON.parse(cachedMovie));
                return;
            }

            const url = `https://imdb-top-100-movies.p.rapidapi.com/${id}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '712766d4b3mshba22a82f0b8098fp1fd8cajsn86a2a3220f53',
                        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = await response.json();
                setMovie(result); // Adjust this based on actual response structure

                // Store in local storage
                localStorage.setItem(`movie_${id}`, JSON.stringify(result));
            } catch (error) {
                console.error("Error fetching movie details:", error);
                alert("Failed to fetch movie details. Please try again later.");
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mobile card'>
            <img src={movie.big_image || movie.thumbnail} alt={movie.title} className='img'/>
            &nbsp;&nbsp;
            <div>
                <h1>{movie.original_title || movie.title}</h1>
                <p>{movie.description}</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p><strong>Publish:</strong> {movie.year}</p>
                <a href={movie.imdb_link}  className='btn btns'>Watch Now!</a>&nbsp;&nbsp;
                <a href='/' className='btn btns'>Back to Movies List</a>
            </div>
           
        </div>
    );
};

export default MovieDetails;
