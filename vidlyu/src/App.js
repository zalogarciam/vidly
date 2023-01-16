import "./App.css";
import Movie from "./components/movie";
import NavBar from "./components/navBar";
import { Route, Routes, Switch } from "react-router-dom";
import Customer from "./components/customer";
import Rental from "./components/rental";

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
            <Route path="/" element={<Movie />}></Route>
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
