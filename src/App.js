import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
    return (
        <Router future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }}>
            <Routes>
                <Route path="/movie/:id" element={<Detail/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
