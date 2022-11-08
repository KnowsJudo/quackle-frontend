import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, Textarea } from "@mantine/core";
import { IQuackInput } from "../../types/quacks";
import { QuackleContext } from "../../context/user-context";
import "./quack-input.css";

export const QuackInput: React.FC<IQuackInput> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [quackContent, setQuackContent] = useState<string>("");

  const submitQuack = async () => {
    await axios
      .post(`//localhost:3001/api/user/${userData.username}/quacks`, {
        username: userData.username,
        message: quackContent,
      })
      .then((res) => {
        console.log(res);
        setQuackContent("");
      })
      .catch((e) => console.error(e));
  };

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
        placeholder="What's Quacking?"
        onChange={(e) => setQuackContent(e.target.value)}
      />
      <span className="quack-submit">
        <Button onClick={submitQuack}>Quack!</Button>
      </span>
    </section>
  );
};
