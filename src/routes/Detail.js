import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import tmdbAPI from "../config/tdmb";
import {IMAGE_BASE_URL} from "../config/constants";

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
        <div>
            {loading ? (
                <h1>Loading Movie Details...</h1>
            ) : (
                detail && (
                    <div>
                        {detail.poster_path && (
                            <img
                                src={`${IMAGE_BASE_URL}${detail.poster_path}`}
                                alt={detail.title}
                                style={{width: '300px'}}
                            />
                        )}

                        <h1>{detail.title}</h1>
                        <p><strong>Release Date:</strong> {detail.release_date}</p>
                        <p><strong>Rating:</strong> ⭐ {detail.vote_average}</p>

                        <div>
                            <strong>Genres: </strong>
                            {
                                detail.genres
                                    ? detail.genres.map(each => each.name).join(', ')
                                    : "No genre information"
                            }
                        </div>

                        <hr/>
                        <h3>Overview</h3>
                        <p>{detail.overview || "No overview"}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default Detail;
