import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";
// import Add from "./pages/Add.jsx";

function App() {
    // BrowserRouter는 주소 감지 능력
    // Routes는 그 안에 있는 것들 중에 하나로 사용자를 떨궈주는 것
    // Route는 그냥 조건 (if)

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/search"} element={<Search />} />
                <Route path={`/detail/:id`} element={<Detail />} />
            </Routes>
            <Home />
        </BrowserRouter>
    );
}
export default App;
