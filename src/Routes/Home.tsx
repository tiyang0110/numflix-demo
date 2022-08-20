import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { movieIdState } from "../atom";
import HomeNowPlayingSlider from "../Components/HomeNowPlayingSlider";
import HomeTopRatedSlider from "../Components/HomeTopRatedSlider";
import MovieDetail from "../Components/MovieDetail";

const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
`;

function Home(){
  const movieId = useRecoilValue(movieIdState);

  return (
    <Wrapper>
      <HomeNowPlayingSlider />
      <HomeTopRatedSlider />
      <MovieDetail pageType="home" movieId={movieId}/>
    </Wrapper>
  );
}

export default Home;