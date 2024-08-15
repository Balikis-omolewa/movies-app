import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard'; 
import { useNavigate } from "react-router-dom";

const MovieList = () => {
    const styles = {
      button: {
            padding: "12px 20px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "10px",
            width: "100%",
            maxWidth: "200px",
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
        },
        header: {
            display: "block",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            width: "100%",
            padding: "5px",
            borderRadius: "8px",
        },
        container: {
            width: "100%",
            padding: "20px",
            boxSizing: "border-box",
        },
        movieList: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
        },
    };

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', overview: '', rating: 0, poster_path: '' });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(event.target.value.toLowerCase())
            )
        );
    };

    const handleAddMovie = (e) => {
        e.preventDefault();
        const movie = { ...newMovie, _id: Date.now().toString() }; // Use timestamp as ID
        const updatedMovies = [...movies, movie];
        setMovies(updatedMovies);
        // Update local storage
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setNewMovie({ title: '', overview: '', rating: 0, poster_path: '' });
    };

    const handleDeleteMovie = (id) => {
        const updatedMovies = movies.filter((movie) => movie._id !== id);
        setMovies(updatedMovies);
        // Update local storage
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
    };

    const handleSortByRating = () => {
        const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
        setMovies(sortedMovies);
        // Update local storage
        localStorage.setItem('movies', JSON.stringify(sortedMovies));
    };

    const fetchMovie = async () => {
        const cachedMovies = localStorage.getItem('movies');
        if (cachedMovies) {
            setMovies(JSON.parse(cachedMovies));
            return;
        }

        const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '712766d4b3mshba22a82f0b8098fp1fd8cajsn86a2a3220f53',
                    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setMovies(result);
            // Cache the result
            localStorage.setItem('movies', JSON.stringify(result));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    console.log("All movies", movies);

    const navigate = useNavigate();

    // handle show product details
    const showMovieDescription = (id) => { 
        console.log("Movie ID: ", id);
        // navigate to movie details page
        navigate(`/movie/${id}`);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
            <h4 style={{color: "#fff"}}>Search Movie</h4>
                <div className="form">
                <input className="input"
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.input}
                />
                <button onClick={handleSortByRating} style={styles.button}>Sort by Rating</button>
                </div>
                <h4 style={{color: "#fff"}}>Add New Movie</h4>
                <form className="form" onSubmit={handleAddMovie}>
                    <input className="input"
                        type="text"
                        placeholder="Add movie title..."
                        value={newMovie.title}
                        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                        style={styles.input}
                    />
                    <input className="input"
                        type="text"
                        placeholder="Poster URL"
                        value={newMovie.poster_path}
                        onChange={(e) => setNewMovie({ ...newMovie, poster_path: e.target.value })}
                        style={styles.input}
                    />
                    <input className="input"
                        type="text"
                        placeholder="Description"
                        value={newMovie.overview}
                        onChange={(e) => setNewMovie({ ...newMovie, overview: e.target.value })}
                        style={styles.input}
                    />
                    <input className="input"
                        type="text"
                        placeholder="Rating"
                        value={newMovie.rating}
                        onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Add Movie</button>
                </form>
            </header>

            <div style={styles.movieList}>
                {(searchTerm ? filteredMovies : movies).map((movie, index) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        img={movie.image}
                        description={movie.description}
                        rating={movie.rating}
                        func={() => showMovieDescription(movie.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
