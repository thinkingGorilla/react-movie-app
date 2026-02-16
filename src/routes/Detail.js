import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import tmdbAPI from "../config/tdmb";
import {IMAGE_BASE_URL} from "../config/constants";
import styles from "./Detail.module.css";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetails] = useState({});
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.table({
            'URL Parameter (id)': params.id,
            'Query Parameter (hello)': searchParams.get('hello')
        });
    }, [params.id, searchParams]);


    useEffect(() => {
        let isMounted = true;

        // IIFE (Immediately Invoked Function Expression)
        (async () => {
            const fetchedDetails = await tmdbAPI.fetchDetail(params.id);
            if (isMounted) {
                setDetails(_ => fetchedDetails);
                setLoading(false);
            }
        })();

        // cleanup할 때 isMounted를 false로 변경하여 언마운트 후 비동기 함수호출을 방지
        // @formatter:off
        return () => { isMounted = false; };
        // @formatter:on
    }, []);

    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading Movie Details...</span>
                </div>
            ) : (
                detail && (
                    <div className={styles.detail}>
                        {detail.poster_path && (
                            <img
                                src={`${IMAGE_BASE_URL}${detail.poster_path}`}
                                alt={detail.title}
                                className={styles.poster}
                            />
                        )}

                        <div>
                            <h1 className={styles.title}>{detail.title}</h1>

                            <div className={styles.meta}>
                                📅 {detail.release_date} | ⭐ {detail.vote_average}
                            </div>

                            <div className={styles.genres}>
                                <strong>Genres:</strong>{" "}
                                {detail.genres
                                    ? detail.genres.map(g => g.name).join(", ")
                                    : "No genre information"}
                            </div>

                            <div className={styles.overview}>
                                <h3>Overview</h3>
                                <p>{detail.overview || "No overview"}</p>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Detail;
