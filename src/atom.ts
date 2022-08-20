import { atom } from "recoil";

export const movieIdState = atom({
  key: "movieId",
  default: "",
})

export const tvIdState = atom({
  key: "tvId",
  default: "",
})

export const bigMovieOpenState = atom({
  key: "bigMovieOpen",
  default: false
});

export const bigTvOpenState = atom({
  key: "bigTvOpen",
  default: false
});