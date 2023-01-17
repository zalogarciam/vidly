import { Route, Routes, Navigate } from "react-router-dom";
import Movie from "./components/movie";
import NavBar from "./components/navBar";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NotFound from "./components/notFound";
import "./App.css";
import { Fragment } from "react";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <Fragment>
      <NavBar></NavBar>
      <main className="container">
        <Routes>
          <Route path="/movies/:id" element={<MovieForm></MovieForm>}></Route>
          <Route path="/movies" element={<Movie />}></Route>
          <Route path="/customers" element={<Customer />}></Route>
          <Route path="/rentals" element={<Rental />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/movies" />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
