import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { tvIdState } from "../atom";
import TvDetail from "../Components/TvDetail";

import TVArirangTodaySlider from "../Components/TVArirangTodaySlider";

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
      <TvDetail pageType="home" tvId={tvId} />
    </Wrapper>
  );
}

export default TV;