import { BrowserRouter, Route, Routes } from "react-router";
// import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";
import Add from "./pages/Add.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Add />} />
                <Route path={"/search"} element={<Search />} />
                <Route path={`/detail/:id`} element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
