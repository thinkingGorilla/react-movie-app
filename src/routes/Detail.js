import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import tmdbAPI from "../config/tdmb";
import {IMAGE_BASE_URL} from "../config/constants";
import styles from "./Detail.module.css";
import {formatMoney} from "../config/util";

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
                                <span>📅 {detail.release_date}</span>
                                <span>🎬 {detail.runtime} min</span>
                                <span>📈 {detail.popularity?.toFixed(1)}</span>
                                <span>💰 {formatMoney(detail.budget)}</span>
                                <span className={styles.rating}>
                                    ⭐ {detail.vote_average}
                                    <small>({detail.vote_count?.toLocaleString()} votes)</small>
                                </span>
                            </div>
                            <div className={styles.genres}>
                                <h3>Genres</h3>
                                <ul className={styles.genreList}>
                                    {detail.genres && detail.genres.length > 0
                                        ? (
                                            detail.genres.map((genre) => (
                                                <li key={genre.id} className={styles.genreChip}>
                                                    {genre.name}
                                                </li>
                                            ))
                                        )
                                        : (<li>No genre information</li>)
                                    }
                                </ul>
                            </div>
                            <div className={styles.overview}>
                                <h3>Overview</h3>
                                <p>{detail.overview || "No overview"}</p>
                            </div>
                            <div className={styles.production}>
                                <h3>Production Companies</h3>
                                <div className={styles.productionList}>
                                    {detail.production_companies && detail.production_companies.length > 0
                                        ? detail.production_companies
                                            .map(company => (
                                                <div key={company.id} className={styles.company}>
                                                    {company.logo_path
                                                        ? (
                                                            <img
                                                                src={`${IMAGE_BASE_URL.replace('/w500', '/w200')}${company.logo_path}`}
                                                                alt={company.name}
                                                                className={styles.companyLogo}
                                                            />
                                                        )
                                                        : (
                                                            <div className={styles.companyFallback}>
                                                                {company.name}
                                                            </div>
                                                        )}
                                                </div>
                                            ))
                                        : <p>No production company information</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Detail;
