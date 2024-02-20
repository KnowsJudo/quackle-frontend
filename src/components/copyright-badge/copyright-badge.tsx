import React from "react";
import { Badge } from "@mantine/core";
import "./copyright-badge.css";

interface ICopyrightBadge {
  compact: boolean;
}

export const CopyrightBadge: React.FC<ICopyrightBadge> = (props) => {
  return (
    <Badge
      style={{
        margin: props.compact ? "auto auto 0 0" : "30% auto",
        padding: "15px 0",
        backgroundColor: "#282c34",
      }}
    >
      <a href="https://lachieb.dev" className="lachie-anchor">
        &copy; LachieB.dev
      </a>
    </Badge>
  );
};
