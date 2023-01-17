import "./App.css";
import Movie from "./components/movie";
import NavBar from "./components/navBar";
import { Route, Routes, Navigate } from "react-router-dom";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NotFound from "./components/notFound";

function App() {
  return (
    <main className="container">
      <div>
        <NavBar></NavBar>
        <div className="content">
          <Routes>
            <Route path="/movies" element={<Movie />}></Route>
            <Route path="/customers" element={<Customer />}></Route>
            <Route path="/rentals" element={<Rental />}></Route>
            <Route path="/not-found" element={<NotFound />}></Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
