import { Route, Routes, Navigate } from "react-router-dom";
import { Fragment } from "react";
import Movie from "./components/movie";
import NavBar from "./components/navBar";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import "./App.css";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <Fragment>
      <NavBar></NavBar>
      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginForm></LoginForm>}></Route>
          <Route path="/movies/:id" element={<MovieForm></MovieForm>}></Route>
          <Route path="/movies" element={<Movie />}></Route>
          <Route path="/customers" element={<Customer />}></Route>
          <Route path="/rentals" element={<Rental />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/movies" />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
