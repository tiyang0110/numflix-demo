import { AnimatePresence, useScroll } from "framer-motion";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { getMovieDetail, IMovieDetail } from "../api";
import { makeImagePath } from "../utils";
import { useRecoilState } from "recoil";
import { bigMovieOpenState } from "../atom";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const Wrapper = styled(motion.div)`
  position: absolute; 
  width: 40vw; 
  left: 0; 
  right: 0; 
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 15px;
  overflow: hidden;
  h2 {
    position: relative;
    font-size: 20px;
    padding: 20px;
    top: -100px;
  }
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const Title = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-size: 40px;
  padding: 20px;
  top: -80px;
  position: relative;
  display: flex;
  align-items: flex-end;
  h3 {
    font-size: 19px;
    margin-left: 10px;
    position: relative;
    top: -7px;
  }
`;

const Overview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Tags = styled.div`
  position: relative;
  top: -120px;
  padding: 20px;
`;

const Tag = styled.span`
  border: 1px solid ${(props) => props.theme.white.lighter};
  padding: 5px;
  border-radius: 5px;
  &:not(:first-child){
    margin-left: 10px;
  }
  span:first-child{
    margin-left: 10px;
  }
`;

interface IMovieDetailProps {
  movieId: string;
  pageType: string;
}

function MovieDetail({movieId, pageType}:IMovieDetailProps){
  const {scrollY} = useScroll();
  const [bigMovieOpen, setBigMovieOpen] = useRecoilState(bigMovieOpenState);
  const [movieDetail, setMovieDetail] = useState<IMovieDetail>();

  const fetchGetMovieDetail = useCallback( async (movieId:string) => {
    const data = await getMovieDetail(movieId);
    setMovieDetail(data);
  }, []);

  const onOverlayClick = () => {
    setBigMovieOpen(false);
  };

  useEffect(() => {
    if(movieId){
      fetchGetMovieDetail(movieId);
    }
  }, [bigMovieOpen]);

  return (
    <AnimatePresence>
      {bigMovieOpen ? (
        <>
          <Overlay onClick={onOverlayClick} animate={{opacity: 1}} exit={{opacity: 0}} />
          <Wrapper layoutId={movieId} style={{top: scrollY.get() + 100}}>
            {movieDetail && (
              <>
                <Cover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(movieDetail.backdrop_path, "w500")})`}} />
                <Title>
                  {movieDetail?.title}
                  <h3>({movieDetail?.release_date.substring(0, 4)})</h3>
                </Title>
                <Overview>{movieDetail?.overview}</Overview>
                <h2>- Genres -</h2>
                <Tags>
                  {movieDetail?.genres.map((genre) => (
                    <Tag key={genre.id}>{genre.name}</Tag>
                  ))}
                </Tags>
              </>
            )}
          </Wrapper>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default MovieDetail;