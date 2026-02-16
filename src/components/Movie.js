import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({genreData, movieData}) {
    return (
        <div className={styles.movie}>
            {movieData.poster_path && (
                <img
                    src={movieData.poster_path}
                    alt={movieData.title}
                    className={styles.movie__img}
                />
            )}

            <div className={styles.movie__content}>
                <h2 className={styles.movie__title}>
                    <Link to={`/movie/${movieData.id}?hello=world`}>
                        {movieData.title}
                    </Link>
                </h2>

                <h3 className={styles.movie__year}>
                    {movieData.release_date}
                </h3>

                <p className={styles.movie__summary}>
                    {movieData.overview}
                </p>

                <ul className={styles.movie__genres}>
                    {movieData.genre_ids.map(genreId => (
                        <li key={genreId}>
                            {genreData[genreId] || 'Unknown'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

Movie.propTypes = {
    genreData: PropTypes.object.isRequired,
    movieData: PropTypes.object.isRequired
};

export default Movie;
