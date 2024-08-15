import { Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList"
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from "./components/MovieDetails";

function App() {

  return (
    <>
      <div style={{ padding: "20px"}}>
    <h1 style={{ color: "#fff"}}>Welcome to CineWave!</h1>
      <p style={{ color: "#fff"}}>Need help deciding what to watch before your popcorn runs out? 
        We’ve got you covered! Ride the wave of cinematic excellence and discover the best movies across all languages, eras, and genres. 
        Check out the latest movies here.</p>
    </div>
        
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
     
    </>
  )
}

export default App
