import React from "react";
import { Badge } from "@mantine/core";
import { Link } from "react-router-dom";

export const TrendingBadge: React.FC = () => {
  return (
    <Link to="/trending" style={{ color: "white", textDecoration: "none" }}>
      <Badge
        size="lg"
        radius="xl"
        style={{
          margin: "auto",
          padding: "25px",
          backgroundColor: "#282c34",
          color: "white",
        }}
      >
        See popular ducks
      </Badge>
    </Link>
  );
};
