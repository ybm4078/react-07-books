import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// VITE가 불러들여준 환경변수를 꺼낼 때는 function 밖에서


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

    // 2. 백엔드에게 '어쩌구'를 이용하여 결과를 달라고 해서, 받아서, 가공해서, 저장

    const [list,setList] = useState([]);

    // Google Books API를 사용할 건데
    // 누구나 사용할 수 있데 공개 APL가 아님. 기존에 등록해둔 개발자만 사용할 수 있음
    // 그렇게 등록을 하면 Token을 줌 (깃헙과 같은 경우)
    // 요청을 보낼 때 토근을 요청에 담아서 보내야 함

    // Token은 "내 신분증"
    // 외부에 노출될 가능성이 100%
    // Token이나, 비밀번호 같은 민감한 정보는 코드에 포함시켜서는 안됨. 절대로.
    // => 이러한 민간함 정보를 코드 상에 사용하지 않도록 존재하는 장치 => "환경변수"

    useEffect(() => {
        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        );
    }, [])
    return <></>;
}
export default Search;
