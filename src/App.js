import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import {ROUTER_BASE_URL} from "./config/constants";
import "./styles.css";

function App() {
    return (
        <Router
            basename={ROUTER_BASE_URL}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}
        >
            <Routes>
                <Route index element={<Home />} />
                <Route path="movie/:id" element={<Detail/>}/>
            </Routes>
        </Router>
    );
}

export default App;
