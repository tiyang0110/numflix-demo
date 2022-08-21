import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getLatestTVs, getPopularTVs, IGetTvResult, ITvLatest } from "../api";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { bigTvOpenState, tvIdState } from "../atom";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const CategoryTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

const Slider = styled.div`
  height: 200px;
  display: flex;
  margin-top: 10px;
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
  top: 30px;
`;

const Row = styled(motion.div)`
  width: 100%;
  box-sizing: border-box;
  background-color: teal;
  color: white;
  border-radius: 10px;
  padding: 30px;
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

function TvLatestSlider(){
  const {data, isLoading} = useQuery<ITvLatest>(['tv', 'latest'], getLatestTVs);
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const setTvId = useSetRecoilState(tvIdState);
  const setBigTvOpen = useSetRecoilState(bigTvOpenState);
  
  useEffect(() => {
    console.log(data);
  }, [data]);

  // const onClickChangeIndex = (dir:string) => {
  //   if(data){
  //     if(leaving) return;
  //     toggleLeaving();
  //     const totalMovies = data.results.length - 1;
  //     const maxIndex = Math.ceil(totalMovies / offset) - 1;

  //     if(dir === "left"){
  //       setBack(true);
  //       setIndex((prev) => prev === 0 ? maxIndex : prev - 1);
  //     }else{
  //       setBack(false);
  //       setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
  //     }
  //   }
  // };

  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId:string) => {
    setTvId(movieId);
    setBigTvOpen(true);
  };

  return (
    <>
      {isLoading ? ( 
        <Loader>Loading</Loader>
      ) : ( 
        <>
          <Wrapper>
            <CategoryTitle>Latest Show</CategoryTitle>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={back}>
                <Row variants={rowVar} custom={back} initial="hidden" animate="visible" exit="exit" transition={{type:"tween", duration:1}} key={index}>
                  <div>{data?.name}</div>
                </Row>
              </AnimatePresence>
          </Wrapper>
        </>
      )}
    </>
  );
}

export default TvLatestSlider;