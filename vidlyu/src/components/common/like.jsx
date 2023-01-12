import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as lightHeart } from "@fortawesome/free-regular-svg-icons";

const Like = ({ liked, onClick }) => {
  if (liked)
    return (
      <FontAwesomeIcon
        onClick={onClick}
        icon={solidHeart}
        style={{ cursor: "pointer" }}
      />
    );
  else
    return (
      <FontAwesomeIcon
        onClick={onClick}
        icon={lightHeart}
        style={{ cursor: "pointer" }}
      />
    );
};

export default Like;
