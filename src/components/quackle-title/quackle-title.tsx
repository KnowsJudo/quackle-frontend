import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@mantine/core";
import { GiNestBirds } from "react-icons/gi";
import "./quackle-title.css";

export const QuackleTitle: React.FC = () => {
  return (
    <Link to={"/"} style={{ color: "black", textDecoration: "none" }}>
      <span className="quackle-head">
        <GiNestBirds style={{ marginRight: "10px", color: "#282c34" }} />
        <Text>Quackle</Text>
      </span>
    </Link>
  );
};
