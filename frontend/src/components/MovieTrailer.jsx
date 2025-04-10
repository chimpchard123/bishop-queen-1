import React from 'react';
import './MovieTrailer.css';

const MovieTrailer = ({ trailerUrl }) => {
    if (!trailerUrl) {
        return <p>No trailer available.</p>;
    }

    return (
        <div className="video-container">
            <iframe
                width="560"
                height="315"
                src={trailerUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Movie Trailer"
            ></iframe>
        </div>
    );
};

export default MovieTrailer;
