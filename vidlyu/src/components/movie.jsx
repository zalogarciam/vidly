import React, { Component, Fragment } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movie extends Component {
  allGenres = { _id: -1, name: "All Genres" };
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: this.allGenres,
    genres: [],
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
    });
  }

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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ currentGenre: genre });
  };

  render() {
    let { length: count } = this.state.movies;
    const { length: genresCount } = this.state.genres;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      genres: allGenres,
    } = this.state;

    if (count == 0) return <p>There are no movies in the database</p>;

    let filteredMovies = null;
    let movies = null;
    if (currentGenre.name !== "All Genres") {
      filteredMovies = allMovies.filter(
        (m) => m.genre.name === currentGenre.name
      );
      movies = paginate(filteredMovies, currentPage, pageSize);
      count = movies.length;
    } else {
      movies = paginate(allMovies, currentPage, pageSize);
    }

    return (
      <div className="body container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={allGenres}
              textProperty = "name"
              valueProperty = "_id"
              currentGenre={currentGenre}
              onItemSelect={this.handleGenreSelect}
            ></ListGroup>
          </div>
          <div className="col-9">
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
                {movies.map((movie) => (
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
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            ></Pagination>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
