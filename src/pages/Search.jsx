import { useSearchParams } from "react-router";

function Search() {
    // Search 컴포넌트가 뜨는 상황은
    // 사용자가 Home에서 뭔가 keyword를 입력했고, 그걸 Home 컴포넌트는
    // 쿼리스트링 keyword=ㄹㄴㅁㅇㄹ 담아서 전달해준 상황

    // 1. 쿼리스트링 keyword=어쩌구 에서 '어쩌구'를 가져와서
    // 2. 백엔드에게 '어쩌구'를 이용하여 결과를 달라고 해서, 받아서, 가공해서, 저장
    // 3. 그걸 화면에 출력

    // 쿼리스트링에서 제공된 값을 가져올 때 써야되는 함수 : useSearchParams()
    const [searchParams] = useSearchParams(); // 변형된 state임
    const keyword = searchParams.get("keyword");

    // 동적 라우팅을 통한 params와 searchParams의 큰 차이
    // params는 무조건 있음. searchParams는 있을 수도 있고 없을 수도 있음.

    // 1. /search                =>  keyword의 타입 : null
    // 2. /search?a=10           =>                : null
    // 3. /search?keyword=       =>                : ""
    // 4. /search?keyword=Math   =>                : "Math"
    return <></>;
}
export default Search;
