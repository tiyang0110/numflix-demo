import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMovieSearchData, searchMovie } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import MovieDetail from "../Components/MovieDetail";
import { useSetRecoilState } from "recoil";
import { bigMovieOpenState } from "../atom";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr, 1fr;
  width: 100%;
  box-sizing: border-box;
  padding: 50px;
  gap: 10px;
  top: 40px;
  position: relative;
`;

const Poster = styled(motion.div)<{postersrc:string}>`
  background-image: url(${(props) => props.postersrc});
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
`;

const PosterVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    }
  }
}

function Search(){
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [searchData, setSearchData] = useState<IMovieSearchData>();
  const [movieId, setMovieId] = useState("");
  const setBigMovieOpen = useSetRecoilState(bigMovieOpenState);

  const fetchSearchKeyword = useCallback( async () => {
    const data = await searchMovie(keyword);
    setSearchData(data);
  }, [keyword]);


  const onBoxClicked = (movieId:string) => {
    setBigMovieOpen(true);
    setMovieId(movieId);
  };

  useEffect(() => {
    fetchSearchKeyword();
  }, [fetchSearchKeyword]);

  return (
    <Wrapper>
      <>
        {searchData?.results.map((movie) => (
          <Poster
            layoutId={movie.id+""}
            key={movie.id}
            postersrc={makeImagePath(movie.poster_path, "w200")}
            variants={PosterVar}
            initial="normar"
            whileHover="hover"
            transition={{type: "tween"}}
            onClick={() => onBoxClicked(movie.id+"")}
          >
          </Poster>
        ))}
        <MovieDetail pageType="search" movieId={movieId} />
      </>
    </Wrapper>
  );
}

export default Search;