import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function Movie({genreData, movieData}) {
    return (
        <div>
            {movieData.poster_path && (
                <img
                    src={movieData.poster_path}
                    alt={movieData.title}
                    style={{ width: '200px' }}
                />
            )}
            <h3>
                {
                    // URL 파라미터 전달
                    <Link to={`/movie/${movieData.id}?hello=world`}>{movieData.title}</Link>
                }
            </h3>
            <p>{movieData.overview}</p>
            <ul>
                {movieData.genre_ids.map(genreId => (
                    <li key={genreId}>
                        {genreData[genreId] || 'Unknown'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Movie.propTypes = {
    genreData: PropTypes.object.isRequired,
    movieData: PropTypes.object.isRequired
};

export default Movie;
