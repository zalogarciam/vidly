import React, { Component, Fragment } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import Input from "./common/input";
import SearchBox from "./common/searchBox";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  // getPagedData = () => {
  //   const {
  //     pageSize,
  //     currentPage,
  //     sortColumn,
  //     selectedGenre,
  //     searchQuery,
  //     movies: allMovies,
  //   } = this.state;

  //   let filtered = allMovies;
  //   if (searchQuery)
  //     filtered = allMovies.filter((m) =>
  //       m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  //     );
  //   else if (selectedGenre && selectedGenre._id)
  //     filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

  //   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  //   const movies = paginate(sorted, currentPage, pageSize);

  //   return { totalCount: filtered.length, data: movies };
  // };

  render() {
    const { length: count } = this.state.movies;
    const { length: genresCount } = this.state.genres;
    const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery } =
      this.state;
    const { navigation } = this.props;
    if (count == 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="body container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            ></ListGroup>
          </div>

          <div className="col-9">
            <div>
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            </div>
            <p> Showing {totalCount} movies in the database</p>
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
            ></SearchBox>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            ></MoviesTable>
            <Pagination
              itemsCount={totalCount}
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
