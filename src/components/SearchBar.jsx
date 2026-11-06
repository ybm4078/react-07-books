import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

function SearchBar({ keyword }) {
    const navigate = useNavigate();
    const [input, setInput] = useState(keyword);

    const onChangeHandler = event => setInput(event.target.value);
    const onSubmitHandler = event => {
        event.preventDefault();
        const k = input.trim();
        if (!k) return;

        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <input className={styles.input} onChange={onChangeHandler} value={input} />
            <button className={styles.button} type="submit">
                검색
            </button>
        </form>
    );
}
export default SearchBar;