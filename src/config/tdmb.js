import {ACCESS_TOKEN, API_BASE_URL} from './constants';

export const fetchGenres = async () => {
    const baseUrl = `${API_BASE_URL}/genre/movie/list`;
    const queryParams = [
        'language=en'
    ];
    const url = `${baseUrl}?${queryParams.join('&')}`;
    const headers = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'accept': 'application/json'
        }
    }
    return (await fetch(url, headers)).json();
}

export const fetchMovies = async () => {
    const baseUrl = `${API_BASE_URL}/movie/popular`;
    const queryParams = [
        'language=en-US',
        'page=1'
    ];
    const url = `${baseUrl}?${queryParams.join('&')}`;
    const headers = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'accept': 'application/json'
        }
    }
    return (await fetch(url, headers)).json();
}

export const fetchDetail = async (movieId) => {
    const baseUrl = `${API_BASE_URL}/movie/${movieId}`;
    const queryParams = [
        'language=en-US'
    ];
    const url = `${baseUrl}?${queryParams.join('&')}`;
    const headers = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'accept': 'application/json'
        }
    }
    return (await fetch(url, headers)).json();
}

// 한꺼번에 묶어서도 export
const tmdbAPI = {
    fetchGenres,
    fetchMovies,
    fetchDetail
};

export default tmdbAPI;
