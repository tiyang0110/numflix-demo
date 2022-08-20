import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { movieIdState } from "../atom";
import HomeNowPlayingSlilder from "../Components/HomeNowPlayingSlider";
import HomeTopRatedSlilder from "../Components/HomeTopRatedSlider";
import NowPlayingMovieDetail from "../Components/NowPlayingMovieDetail";

const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
`;

function Home(){
  const movieId = useRecoilValue(movieIdState);

  return (
    <Wrapper>
      <HomeNowPlayingSlilder />
      <HomeTopRatedSlilder />
      <NowPlayingMovieDetail pageType="home" movieId={movieId}/>
    </Wrapper>
  );
}

export default Home;