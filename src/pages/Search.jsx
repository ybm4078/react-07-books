import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    const [searchParams] = useSearchParams(); // 변형된 state임
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inputKeyword, setInputKeyword] = useState("");

    const onChangeHandler = e => {
        setInputKeyword(e.target.value);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        const K = inputKeyword.trim();
        if (!K) return;
        navigate(`/search?keyword=${encodeURIComponent(K)}`);
    };

    useEffect(() => {
        if (!keyword) return;

        setInputKeyword(keyword);
        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then(json => setList(json.items))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <div className={styles.container}>
            <h3>검색 결과 : {keyword}</h3>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <input className={styles.input} onChange={onChangeHandler} value={inputKeyword} />
                <button className={styles.button} type="submit">
                    검색
                </button>
            </form>
            {loading ? (
                <div className={styles.message}>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div className={styles.message}>검색 결과가 없습니다.</div>
            ) : (
                list.map((item, index) => {
                    return (
                        <>
                            <Link key={index} to={`/detail/${item.id}`} className={styles.book}>
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
                                    <div className={styles.authors}>
                                        {item.volumeInfo.authors?.join(", ")}
                                    </div>
                                </div>
                            </Link>
                        </>
                    );
                })
            )}
        </div>
    );
}

export default Search;
