import {useEffect, useState} from "react";
import Movie from "../components/Movie";
import {IMAGE_BASE_URL} from '../config/constants';
import {fetchGenres, fetchMovies} from "../config/tdmb";
import styles from "./Home.module.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let isMounted = true;

        // IIFE (Immediately Invoked Function Expression)
        (async () => {
            const fetchedGenres = await fetchGenres();
            const fetchedMovies = await fetchMovies();
            if (isMounted) {
                setGenres(_ => fetchedGenres.genres
                    .reduce((map, each) => {
                        map[each.id] = each.name;
                        return map;
                    }, {})
                );
                setMovies(_ => fetchedMovies.results);
                setLoading(false);
            }
        })();

        // cleanup할 때 isMounted를 false로 변경하여 언마운트 후 비동기 함수호출을 방지
        // @formatter:off
        return () => { isMounted = false; };
        // @formatter:on
    }, []);

    return (
        <div>
            {
                loading
                    ? <div className={styles.loader}>
                        <span>Loading...</span>
                    </div>
                    : <div className={styles.movies}>
                        {
                            // JSX의 { } 안은 "값을 반환하는 자리"이므로, 문장을 끝내는 세미콜론(;)을 붙이면 안된다.
                            movies.map(movie =>
                                <Movie key={movie.id}
                                       genreData={genres}
                                       movieData={
                                           {
                                               ...movie,
                                               poster_path: movie.poster_path
                                                   ? `${IMAGE_BASE_URL}${movie.poster_path}`
                                                   : null
                                           }
                                       }
                                />
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default Home;
