import { Link } from "react-router-dom";

function MoviesPage() {
  return (
    <div className="movies-page">
      <h1>Current Movies</h1>
      <p>Here you will see a list of all our current movies</p>
      <Link to="/" className="home-link">
        Back to Home
      </Link>
    </div>
  );
}

export default MoviesPage;
