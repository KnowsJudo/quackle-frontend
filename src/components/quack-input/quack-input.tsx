import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, CloseButton, Image, Progress, Textarea } from "@mantine/core";
import { IQuackInput } from "../../types/quacks";
import { QuackleContext } from "../../context/user-context";
import "./quack-input.css";

export const QuackInput: React.FC<IQuackInput> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [quackContent, setQuackContent] = useState<string>("");

  const submitQuack = async () => {
    await axios
      .post(`//localhost:3001/api/user/${userData.username}/quacks`, {
        name: userData.name,
        username: userData.username,
        message: quackContent,
      })
      .then((res) => {
        console.log(res);
        setQuackContent("");
      })
      .catch((e) => console.error(e));
  };

  const closeModal = () => {
    if (!quackContent) {
      props.setInitiateQuack?.(false);
      return;
    }
  };

  return (
    <section
      className={props.fixed ? "quack-input-anywhere" : "quack-input-home"}
      onClick={props.fixed ? () => closeModal() : undefined}
    >
      <div
        className={props.fixed ? "input-anywhere-inner" : "input-home-inner"}
        onClick={props.fixed ? (e) => e.stopPropagation() : undefined}
      >
        {props.fixed && (
          <CloseButton
            title="Close"
            size="xl"
            sx={{ marginLeft: "-10px" }}
            onClick={() => closeModal()}
          />
        )}
        <span className="quack-input-user">
          <Image
            src={props.displayPic}
            withPlaceholder
            height={40}
            width={40}
          />
          <p>
            <b>{`@${props.atUser}`}</b>
          </p>
        </span>
        <Textarea
          autosize
          value={quackContent}
          minRows={props.fixed ? 4 : 3}
          maxRows={props.fixed ? 7 : 10}
          placeholder="What's Quacking?"
          onChange={(e) => setQuackContent(e.target.value)}
          variant="unstyled"
        />
        <span className="quack-submit">
          <Progress />
          <Button onClick={submitQuack} disabled={!quackContent ? true : false}>
            Quack!
          </Button>
        </span>
      </div>
    </section>
  );
};
