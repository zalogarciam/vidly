import React, { Component, Fragment } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { filter } from "lodash";
import MoviesTable from "./moviesTable";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: true,
    genres: [],
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    let { length: count } = this.state.movies;
    const { length: genresCount } = this.state.genres;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres: allGenres,
    } = this.state;

    if (count == 0) return <p>There are no movies in the database</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="body container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={allGenres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            ></ListGroup>
          </div>
          <div className="col-9">
            <p> Showing {filtered.length} movies in the database</p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
            ></MoviesTable>
            <Pagination
              itemsCount={filtered.length}
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
