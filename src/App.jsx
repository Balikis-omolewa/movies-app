import MovieList from "./components/MovieList"
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  return (
    <>
      <h1 style={{ color: "#fff", margin: "20px", marginLeft: "8%"}}>Welcome to CineWave!</h1>
      <p style={{ color: "#fff", margin: "20px", marginLeft: "8%"}}>Need help deciding what to watch before your popcorn runs out? 
        We’ve got you covered! Ride the wave of cinematicexcellence and discover the best movies across all languages, eras, and genres. 
        Check out the latest movies here.</p>
      <MovieList />
    </>
  )
}

export default App
