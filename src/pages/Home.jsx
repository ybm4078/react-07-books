import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";

function Home() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const onChangeHandler = e => setKeyword(e.target.value);
    const onSubmitHandler = e => {
        e.preventDefault();
        const k = keyword.trim();
        if (!k) return;
        // 이 입력된 keyword를 가지고 /search 주소로 이동시켜줘야 함
        // 함수(기능) 동작 중에 "이동"을 포함시키기 위해서는
        // useNavigate() 사용해줘야 되는데,
        // 얘를 구현하는게 아니라, useNavigate()를 실행한 결과를 변수에 담아서
        // 변수를 통해 이동시켜줘야 함

        // "/search" 결과 페이지에 사용자를 이동 시켜야 되는데,
        // 입력한 키워드를 쿼리스트링으로 포함시켜서 이동
        // navigate(`/search?keyword=${keyword}`);    <- 아직 부족함

        // 우리는 지금 string을 "주소"로 이동시키고 있는 상황
        // URL은 사실 "영어"와 정해진 특수문자만 가능  => 사용자가 input에 어떤 걸 칠지 모르기 때문에 변환이 필요
        // string을 "주소"에 표현하기 위해 변환 작업을 해주는 명령 encodeURIComponent(스트링)
        navigate(`/search?ketword=${encodeURIComponent(k)}`);
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Google Books검색</h1>
            <form className={styles.from} onSubmit={onSubmitHandler}>
                <input className={styles.input} onChange={onChangeHandler} value={keyword} />
                <button className={styles.button} type="submit">
                    검색
                </button>
            </form>
        </div>
    );
}
export default Home;
