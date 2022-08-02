import { AnimatePresence, useScroll } from "framer-motion";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMovieDetail, IMovieDetail } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute; 
  width: 40vw; 
  height: 80vh; 
  left: 0; 
  right: 0; 
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  padding: 20px;
  top: -80px;
  position: relative;
`;

const BigOvervew = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function MovieDetail(movieDetail:any){
  const navigate = useNavigate();
  const {scrollY} = useScroll();
  const bigMovieMatch = useMatch("/movies/:movieId");

  const onOverlayClick = () => {
    navigate("/");
  };

  // const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay onClick={onOverlayClick} animate={{opacity: 1}} exit={{opacity: 0}} />
          <BigMovie layoutId={movieDetail.id+""} style={{top: scrollY.get() + 100}}>
            {movieDetail && (
              <>
                <BigCover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(movieDetail.backdrop_path, "w500")})`}} />
                <BigTitle>{movieDetail?.title}</BigTitle>
                <BigOvervew>{movieDetail?.overview}</BigOvervew>
                <h2>Detail</h2>
                <h2>Genres</h2>
                {movieDetail?.genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default MovieDetail;