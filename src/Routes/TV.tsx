import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";


const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
`;

function TV(){
  const {data, isLoading} = useQuery(['tv', 'arirangToday'], ()=>{});

  return (
    <Wrapper>

    </Wrapper>
  );
}

export default TV;