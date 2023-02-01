import React from "react";
import { Badge } from "@mantine/core";
import { Link } from "react-router-dom";

export const TrendingBadge: React.FC = () => {
  return (
    <Badge
      size="lg"
      radius="xl"
      style={{
        margin: "auto",
        padding: "25px",
        backgroundColor: "#282c34",
      }}
    >
      <Link to="/trending" style={{ color: "white", textDecoration: "none" }}>
        See popular ducks
      </Link>
    </Badge>
  );
};
