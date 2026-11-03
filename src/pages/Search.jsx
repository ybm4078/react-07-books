import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";

// VITE가 불러들여준 환경변수를 꺼낼 때는 function 밖에서

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    const [searchParams] = useSearchParams(); // 변형된 state임
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

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
    }, []);

    return (
        <div className={styles.container}>
            <h3>검색 결과 : {keyword}</h3>

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
