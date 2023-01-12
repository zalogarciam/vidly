import React, { Component } from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <div className="list-group">
      {items.map((genre) => (
        <a
          key={genre[valueProperty]}
          href="#"
          className={
            genre !== selectedItem
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

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
