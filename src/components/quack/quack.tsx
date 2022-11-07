import React from "react";
import { IQuack } from "../../types/quacks";

export const Quack: React.FC<IQuack> = (props) => {
  return (
    <section className="quack-content">
      <span className="quack-user">
        <h5>{props.name}</h5>
        <h5>{`@${props.username}`}</h5>
        <h5>{props.quackedAt}</h5>
      </span>
      <p>{props.content}</p>
      <span className="quack-options">
        <h6>{`🐤${props.replies.length}`}</h6>
        <h6>{`🐔${props.requacks}`}</h6>
        <h6>{`♡${props.likes}`}</h6>
      </span>
    </section>
  );
};
