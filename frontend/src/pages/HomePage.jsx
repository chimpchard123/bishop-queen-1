import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Filmvisarna</h1>
      <p>Your local cinema experience</p>
      <Link to="/movies" className="movie-link">
        View Current Movies
      </Link>
      <Link to="/movies-trailer">
        <div>Movies Trailer</div>
      </Link>
    </div>
  );
}

export default HomePage;
