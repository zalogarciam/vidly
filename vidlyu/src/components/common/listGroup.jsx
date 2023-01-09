import React, { Component } from "react";

const ListGroup = (props) => {
  const { genres, currentGenre, onGenreChange } = props;

  return (
    <div className="list-group">
      {genres.map((genre) => (
        <a
          key={genre._id}
          href="#"
          className={
            genre !== currentGenre
              ? "list-group-item list-group-item-action"
              : "list-group-item list-group-item-action active"
          }
          onClick={() => onGenreChange(genre)}
        >
          {genre.name}
        </a>
      ))}
    </div>
  );
};

export default ListGroup;
