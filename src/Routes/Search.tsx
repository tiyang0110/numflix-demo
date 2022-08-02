import { useLocation } from "react-router-dom";

function Search(){
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  return null;
}

export default Search;

/*
  1. 모달 팝업 개선해보기
  2. 상단 메뉴 추가
  3. 검색기능 추가
  4. 슬라이더 화살표 버튼 등 개선
*/