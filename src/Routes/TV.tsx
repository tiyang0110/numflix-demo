import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { tvIdState } from "../atom";

import TVArirangTodaySlider from "../Components/TVArirangTodaySlider";
import TvDetail from "../Components/TvDetail";
import TvLatestSlider from "../Components/TVLatestSlider";
import TvPopularSlider from "../Components/TVPopularSlider";
import TvTopRatedSlider from "../Components/TVTopRatedSlider";

const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
  margin-bottom: 50px;
`;

function TV(){
  const tvId = useRecoilValue(tvIdState);

  return (
    <Wrapper>
      <TVArirangTodaySlider />
      <TvTopRatedSlider />
      <TvPopularSlider />
      <TvLatestSlider />
      <TvDetail pageType="home" tvId={tvId} />
    </Wrapper>
  );
}

export default TV;