import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

const Banner = styled.div<{bgPhoto:string}>`
  height: 100vh;
  background-color: green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
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
  gap: 10px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: teal;
  height: 200px;
  color: red;
  font-size: 66px;
`;

const rowVar = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  }
}

function Home(){
  const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const [index, setIndex] = useState(0);
  const upIndex = () => {setIndex((prev) => prev + 1)};

  return (
    <Wrapper>
      {isLoading ? ( 
        <Loader>Loading</Loader>
      ) : ( 
        <>
          <Banner onClick={upIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
              <Row variants={rowVar} initial="hidden" animate="visible" exit="exit" transition={{type:"tween", duration:1}} key={index}>
                {[1,2,3,4,5,6].map((i) => <Box key={i}>{i}</Box>)}
              </Row> 
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;