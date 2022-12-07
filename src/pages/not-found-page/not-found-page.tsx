import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h3>Page Not Found</h3>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        🦆
      </Link>
    </div>
  );
};
