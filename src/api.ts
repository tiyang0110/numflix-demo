const API_KEY = "34dd1ee0f946af031080543a470e2f0b";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
  first_air_date: string;
}

export interface ITvDetail {
  id: number;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  overview: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  first_air_date: string;
  name: string;
}

export interface ITvLatest {
  id: number;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetail {
  id: number;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  overview: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  release_date: string;
  title: string;
}

export interface IMovieSearchData {
  results: IMovie[];
}

export interface ILatestMovie {
    adult: boolean;
    backdrop_path: string|null;
    belongs_to_collection: string|null;
    budget: number;
    genres: [],
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string|null;
    production_companies: [];
    production_countries: [];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: [
        {
            english_name: string;
            iso_639_1: string;
            name: string;
        }
    ],
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


// MOVIE API
export function getMovies(){
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}

export function getLatestMovies(){
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}&language=en-US`).then((response) => response.json());
}

export function getTopRatedMovies(){
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&page=1`).then((response) => response.json());
}

export function getUpcomingMovies(){
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=1`).then((response) => response.json());
}

export function getMovieDetail(movieId:string){
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then((response) => response.json());
}

export function searchMovie(keyword:string|null){
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`).then((response) => response.json());
}


// TV API
export function getArirangTodayTVs(){
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US`).then((response) => response.json());
}

export function getPopularTVs(){
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) => response.json());
}

export function getTopRatedTVs(){
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((response) => response.json());
}

export function getLatestTVs(){
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((response) => response.json());
}

export function getTvDetail(tvId:string){
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((response) => response.json());
}

export function serachTV(keyword:string|null){
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&page=1`).then((response) => response.json());
}