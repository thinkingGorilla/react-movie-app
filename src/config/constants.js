// process.env는 구조 분해 할당할 수 없다.
// 내부적으로 정적(inline) 치환 방식으로 환경 변수를 처리한다.
// 또한 번들러에 따라 인라인할 환경 변수의 "접두어 규칙"이 다르다.
// e.g. Webpack → NEXT_PUBLIC_API_KEY, REACT_APP_API_KEY
export const ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_ACCESS_TOKEN;
export const API_BASE_URL = 'https://api.themoviedb.org/3';
// https://developer.themoviedb.org/docs/image-basics
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
