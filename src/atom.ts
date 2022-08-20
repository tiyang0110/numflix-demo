import { atom } from "recoil";

export const movieIdState = atom({
  key: "movieId",
  default: "",
})

export const bigMovieOpenState = atom({
  key: "bigMovieOpen",
  default: false
});