import React from "react";
import { Link } from "react-router-dom";
import Quack from "../../img/quackk.png";
import "./quackle-title.css";

export const QuackleTitle: React.FC = () => {
  return (
    <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
      <span className="quackle-head">
        <img src={Quack} height={80} width={80} />
        <p className="quackle-title">Quackle</p>
      </span>
    </Link>
  );
};
