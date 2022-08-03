import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMovieSearchData, searchMovie } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";

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

const Poster = styled(motion.div)<{posterSrc:string}>`
  background-image: url(${(props) => props.posterSrc});
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  h4 {

  }
`;

const PosterTitle = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 1;
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

function Search(){
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [searchData, setSearchData] = useState<IMovieSearchData>();

  async function fetchSearchKeyword(){
    const data = await searchMovie(keyword);
    setSearchData(data);
  }

  useEffect(() => {
    fetchSearchKeyword();
  }, [keyword]);

  return (
    <Wrapper>
      {searchData?.results.map((movie) => (
        <Poster key={movie.id} posterSrc={makeImagePath(movie.poster_path, "w200")}>
          {/* <PosterTitle>{movie.title}</PosterTitle> */}
        </Poster>
      ))}
    </Wrapper>
  );
}

export default Search;

/*
  1. 모달 팝업 개선해보기 O
  2. 상단 메뉴 추가
  3. 검색기능 추가
  4. 슬라이더 화살표 버튼 등 개선 O
*/