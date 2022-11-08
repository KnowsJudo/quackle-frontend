import React, { useState } from "react";
import { Button, Textarea } from "@mantine/core";
import { IQuackInput } from "../../types/quacks";

export const QuackInput: React.FC<IQuackInput> = (props) => {
  const [quackContent, setQuackContent] = useState<string>("");

  return (
    <section
      className={props.fixed ? "quack-input-anywhere" : "quack-input-home"}
    >
      <span className="quack-user">
        <h5>{props.displayPic}</h5>
        <h5>{`@${props.atUser}`}</h5>
      </span>
      <Textarea
        value={quackContent}
        onChange={(e) => setQuackContent(e.target.value)}
      />
      <span className="quack-submit">
        <Button>Quack!</Button>
      </span>
    </section>
  );
};
