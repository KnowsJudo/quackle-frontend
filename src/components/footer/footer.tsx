import React from "react";
import { Link } from "react-router-dom";

export const QuackleFooter: React.FC = () => {
  return (
    <footer>
      <Link to="/trending" style={{ color: "white", textDecoration: "none" }}>
        Trending Ducks
      </Link>
    </footer>
  );
};
