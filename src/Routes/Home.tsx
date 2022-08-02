import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgphoto:string}>`
  height: 100vh;
  background-color: green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
  margin-bottom: 20px;
`;

const Slider = styled.div`
  position: relative;
  top: -200px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgphoto:string}>`
  background-image: url(${(props) => props.bgphoto});
  height: 200px;
  color: red;
  font-size: 66px;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child{
    transform-origin: center left;
  }
  &:last-child{
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  h4{
    text-align: center;
    font-size: 18px;
    color: white;
  }
`;

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

const rowVar = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  }
}

const boxVar = {
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

const infoVar = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    }
  }
}

const offset = 6;

function Home(){
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const {scrollY} = useViewportScroll();
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const [index, setIndex] = useState(0);
  const upIndex = () => {
    if(data){
      if(leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
    }
  };
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId:number) => {
    navigate(`/movies/${movieId}`);
  } 

  const onOverlayClick = () => {
    navigate("/");
  }

  const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      {isLoading ? ( 
        <Loader>Loading</Loader>
      ) : ( 
        <>
          <Banner onClick={upIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row variants={rowVar} initial="hidden" animate="visible" exit="exit" transition={{type:"tween", duration:1}} key={index}>
                {data?.results.slice(1).slice(offset*index, offset*index+offset).map((movie) => (
                  <Box layoutId={movie.id+""} key={movie.id} bgphoto={makeImagePath(movie.backdrop_path, "w500")} variants={boxVar} initial="normal" whileHover="hover" transition={{ type: "tween" }} onClick={() => onBoxClicked(movie.id)}>
                    <Info variants={infoVar}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
              </Row> 
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay onClick={onOverlayClick} animate={{opacity: 1}} exit={{opacity: 0}} />
                <BigMovie layoutId={bigMovieMatch.params.movieId} style={{top: scrollY.get() + 100}}>
                  {clickedMovie && (
                    <>
                      <BigCover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})`}} />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOvervew>{clickedMovie.overview}</BigOvervew>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>

        </>
      )}
    </Wrapper>
  );
}

export default Home;