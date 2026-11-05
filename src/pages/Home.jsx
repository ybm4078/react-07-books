import styles from "./Home.module.css";
import SearchBar from "../components/SearchBar.jsx";

function Home() {

    return (
        <div className={styles.container}>
            <span className={styles.title}>Google Books검색</span>
            <SearchBar />
        </div>
    );
}
export default Home;
