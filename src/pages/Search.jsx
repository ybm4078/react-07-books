import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchBar from "../components/SearchBar.jsx";
import { Link, useSearchParams } from "react-router";

// VITE가 불러들여준 환경변수를 꺼낼 때는 function 밖에서 -> export 처리 하기 위해서

// export를 통해 다시금 다른 파일에서 이용할 것 같은 것은
// 여러번 메모리에 상주시킬 것이 아니라 하나를 만들고
// 그걸 export(수출) 시켜서 다른 파일에서 import(수입)해 사용하도록 하는게
// 자원관리 상 유리 + 코드를 여러 번 다시 쓸 필요 없음

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// export default  => 파일 하나에 유일하게 1개만 "대표 수출품"으로 지정 가능
//                    import 때 import Search from "./Search.jsx" 처럼,
//                    유일값으로 불러옴
// export => 몇 개든 상관없이 지정 가능
//           import 때 import { API_KEY } from "./Search.jsx" 처럼,
//           여러 요소(수출품)가 존재하는 객체 안에서 하나를 지정

function Search() {
    const [searchParams] = useSearchParams(); // 변형된 state임
    // react-router는 쿼리스트링을 state를 만들어서 저장하고 있음
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(함수, [의존성배열]);
    // 의존성배열은 배열 안에 바뀔 수 있는 값을 갖고 있는 변수(state, 함수)를 요소로 가질 수 있으며,
    // 의존성 배열에 집어넣은 변수가 바뀔 때마다 useEffect는 함수를 재발동 시킴

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then(json => setList(json.items))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [keyword]);

    //
    // 검색 결과를 담당하는 Search 컴포넌트에서도
    // 검색이 가능하도록 설계 변경 하니,
    // Home에 있는 내용과 다르지 않음을 확인
    //      => 컴포넌트 분리를 고려

    // 컴포넌트가 그려지는 조건은 "주소"이긴 한데, 정확히는 "경로"의 변경

    // SearchBar에서 사용자가 키워드를 입력하고 검색을 시키면 주소가
    // http://localhost:5173/search?keyword=한글
    // =>
    // http://localhost:5173/search?keyword=Math
    // 로만 변경이 되어서 Search라고 하는 컴포넌트가 다시 그려지지 않음
    // 이 말은, 검색을 사용자가 바꾸기 이전에 떠 있던 Search가 그대로 있다는 것
    // 그렇기 때문에 리렌더링이 되지 않음 => useEffect가 발동되어서 검색 결과를 다시 받아와야 되는데 안함

    return (
        <div className={styles.container}>
            <h3>검색 결과 : {keyword}</h3>

            <SearchBar />

            {loading ? (
                <div className={styles.message}>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div className={styles.message}>검색 결과가 없습니다.</div>
            ) : (
                list.map((item, index) => {
                    return (
                        <Link key={index} to={`/detail/${item.id}`} className={styles.book}>
                            {/*
                                 표지를 출력하려고 했더니,
                                 표지가 없는 책이 있어서
                                 thumbnail에 접근을 할 수 없다고 에러가 발생됨

                                 옵셔널 체이닝 연산자인 "?."을 통해서
                                 있으면 값을 불러오고, 없으면 말라고 표현
                             */}
                            {item.volumeInfo.imageLinks ? (
                                <img
                                    className={styles.cover}
                                    src={item.volumeInfo.imageLinks.thumbnail}
                                    alt={item.volumeInfo.title}
                                />
                            ) : (
                                <div className={styles.no_cover}>No Cover</div>
                            )}

                            <div>
                                <div className={styles.title}>{item.volumeInfo.title}</div>
                                {/*
                                     authors는 array임
                                     그럼 map을 돌려서 표현해야 하는가?
                                     .join() : array 안에 요소들을 하나로 합쳐주는 메서드
                                               string 요소가 들어있을 때 가장 많이 씀

                                               const arr = ["홍길동", "김철수", "홍영희"]
                                               arr.join(", ");      => "홍길동, 김철수, 홍영희"

                                     저자가 없는 경우가 발생됨 => 옵셔널 체이닝 연산자
                                 */}
                                <div className={styles.authors}>
                                    {item.volumeInfo.authors?.join(", ")}
                                </div>
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    );
}

export default Search;
