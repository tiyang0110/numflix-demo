import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { bigMovieOpenState, movieIdState } from "../atom";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
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
  font-weight: 700;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
  margin-bottom: 20px;
`;

const CategoryTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  top: -210px;
  position: relative;
  margin-left: 50px;
`;

const Slider = styled.div`
  position: relative;
  top: -200px;
  height: 200px;
  display: flex;
`;

const SliderArr = styled.div<{direction:string}>`
  z-index: 1;
  height: 100%;
  width: 70px;
  position: absolute;
  ${(props) => props.direction === "left" ? "left: 0;" : "right: 0;"}
  background-image: linear-gradient(
    ${(props) => props.direction === "left" ? "to left" : "to right"}, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)
  );
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
  padding: 0px 50px;
  box-sizing: border-box;
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

const rowVar = {
  hidden: (back:boolean) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (back:boolean) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth - 5,
  })
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

function HomeNowPlayingSlider(){
  const {data, isLoading} = useQuery<IGetMoviesResult>(['movie', 'nowPlaying'], getMovies);
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const setMovieId = useSetRecoilState(movieIdState);
  const setBigMovieOpen = useSetRecoilState(bigMovieOpenState);
  
  const onClickChangeIndex = (dir:string) => {
    if(data){
      if(leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      if(dir === "left"){
        setBack(true);
        setIndex((prev) => prev === 0 ? maxIndex : prev - 1);
      }else{
        setBack(false);
        setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
      }
    }
  };

  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId:string) => {
    setMovieId(movieId);
    setBigMovieOpen(true);
  };

  return (
    <>
      {isLoading ? ( 
        <Loader>Loading</Loader>
      ) : ( 
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Wrapper>
            <CategoryTitle>Now Playing</CategoryTitle>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={back}>
                <SliderArr key="sa" direction="left" onClick={() => {onClickChangeIndex("left")}}>&larr;</SliderArr>
                  <Row variants={rowVar} custom={back} initial="hidden" animate="visible" exit="exit" transition={{type:"tween", duration:1}} key={index}>
                    {data?.results.slice(1).slice(offset*index, offset*index+offset).map((movie) => (
                      <Box layoutId={movie.id+""} key={movie.id} bgphoto={makeImagePath(movie.backdrop_path, "w500")} variants={boxVar} initial="normal" whileHover="hover" transition={{type: "tween"}} onClick={() => onBoxClicked(movie.id+"")}>
                        <Info variants={infoVar}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    ))}
                  </Row>
                <SliderArr key="sl" direction="right" onClick={() => {onClickChangeIndex("right")}}>&rarr;</SliderArr>
              </AnimatePresence>
            </Slider>
          </Wrapper>
        </>
      )}
    </>
  );
}

export default HomeNowPlayingSlider;