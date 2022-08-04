import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />}>
          <Route path="movies/:movieId" element={<Home />} />
        </Route>
        <Route path="/tv" element={<TV />} />
        <Route path="/search" element={<Search />}>
          <Route path="search/:movieid" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
