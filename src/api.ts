const API_KEY = "34dd1ee0f946af031080543a470e2f0b";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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

export function getMovies(){
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}

export function getMovieDetail(movieId:string){
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then((response) => response.json());
}

export function searchMovie(keyword:string|null){
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`).then((response) => response.json());
}

export function serachTV(keyword:string|null){
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&page=1`).then((response) => response.json());
}