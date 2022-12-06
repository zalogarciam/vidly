import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as lightHeart } from "@fortawesome/free-regular-svg-icons";

class Like extends Component {
  render() {
    if (this.props.liked) return <FontAwesomeIcon onClick={this.props.onClick} icon={solidHeart} style={{cursor: 'pointer'}} />;
    else return <FontAwesomeIcon onClick={this.props.onClick} icon={lightHeart} style={{cursor: 'pointer'}}/>;
  }
}

export default Like;
