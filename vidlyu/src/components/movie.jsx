import React, { Component, Fragment } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movie extends Component {
  state = { movies: getMovies() };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    if (count == 0) return <p>There are no movies in the database</p>;

    return (
      <div className="body">
        <p> Showing {count} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Number In Stock</th>
              <th scope="col">Daily Rental Rate</th>
              <th scope="col">Like</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  ></Like>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination></Pagination>
      </div>
    );
  }
}

export default Movie;
