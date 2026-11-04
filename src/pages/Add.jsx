import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./Add.module.css";

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// sessionStorage에 저장된 검색 결과 가져오기
function getSavedBookList() {
    try {
        const savedList = sessionStorage.getItem("bookList");

        return savedList ? JSON.parse(savedList) : [];
    } catch (error) {
        console.log("저장된 데이터 읽기 실패:", error);
        return [];
    }
}

function BookSearchApp() {
    // 1. 상태 관리
    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState(
        sessionStorage.getItem("searchKeyword") || "",
    );
    const [list, setList] = useState(getSavedBookList);
    const [loading, setLoading] = useState(false);

    // 2. 검색창 이벤트
    const onChangeHandler = e => {
        setInputKeyword(e.target.value);
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const trimmed = inputKeyword.trim();

        if (!trimmed) return;

        setSearchKeyword(trimmed);

        // 검색어 저장
        sessionStorage.setItem("searchKeyword", trimmed);

        setInputKeyword("");
    };

    // 3. API 호출
    useEffect(() => {
        if (!searchKeyword) return;

        // 이미 저장된 검색 결과가 있다면 API 재호출 방지
        if (list.length > 0) return;

        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchKeyword)}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => {
                if (!res.ok) {
                    throw new Error(`API 오류: ${res.status}`);
                }

                return res.json();
            })
            .then(json => {
                const books = json.items || [];

                setList(books);

                // 검색 결과 저장
                sessionStorage.setItem("bookList", JSON.stringify(books));
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchKeyword, list.length]);

    return (
        <div className={styles.container}>
            {/* 검색 영역 */}
            <h1
                className={styles.title}
                onClick={() => {
                    setInputKeyword("");
                    setSearchKeyword("");
                    setList([]);
                    sessionStorage.removeItem("searchKeyword");
                    sessionStorage.removeItem("bookList");
                }}
                style={{ cursor: "pointer" }}>
                Google Books검색
            </h1>

            <form className={styles.form} onSubmit={onSubmitHandler}>
                <input className={styles.input} onChange={onChangeHandler} value={inputKeyword} />

                <button className={styles.button} type="submit">
                    검색
                </button>
            </form>

            {/* 검색 결과 */}
            {searchKeyword && (
                <div>
                    <h3>검색 결과 : {searchKeyword}</h3>

                    {loading ? (
                        <div className={styles.message}>로딩 중입니다...</div>
                    ) : list.length === 0 ? (
                        <div className={styles.message}>검색 결과가 없습니다.</div>
                    ) : (
                        list.map(item => (
                            <Link className={styles.book} key={item.id} to={`/detail/${item.id}`}>
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
                                    <div className={styles.title1}>{item.volumeInfo.title}</div>

                                    <div className={styles.authors}>
                                        {item.volumeInfo.authors?.join(", ") || "저자 정보 없음"}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default BookSearchApp;
