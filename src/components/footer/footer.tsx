import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mantine/core";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import "./footer.css";
import { CopyrightBadge } from "../copyright-badge/copyright-badge";

export const QuackleFooter: React.FC = () => {
  return (
    <footer className="quackle-footer">
      <Badge
        size="lg"
        radius="xl"
        style={{
          margin: "auto",
          padding: "25px",
          backgroundColor: "#282c34",
        }}
      >
        <Link
          to="/trending"
          style={{
            display: "flex",
            color: "white",
            textDecoration: "none",
            alignItems: "center",
          }}
        >
          <ShowChartIcon /> &nbsp; Trending Ducks
        </Link>
      </Badge>
      <CopyrightBadge compact={false} />
    </footer>
  );
};
