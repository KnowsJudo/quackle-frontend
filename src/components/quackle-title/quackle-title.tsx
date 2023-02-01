import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@mantine/core";
import "./quackle-title.css";

export const QuackleTitle: React.FC = () => {
  return (
    <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
      <span className="quackle-head">
        🦆
        <Text style={{ marginLeft: "7px" }}>Quackle</Text>
      </span>
    </Link>
  );
};
