import React, { Component } from "react";

const ListGroup = (props) => {
  const { genres, textProperty, valueProperty, currentGenre, onItemSelect } =
    props;

  return (
    <div className="list-group">
      {genres.map((genre) => (
        <a
          key={genre[valueProperty]}
          href="#"
          className={
            genre !== currentGenre
              ? "list-group-item list-group-item-action"
              : "list-group-item list-group-item-action active"
          }
          onClick={() => onItemSelect(genre)}
        >
          {genre[textProperty]}
        </a>
      ))}
    </div>
  );
};

export default ListGroup;
