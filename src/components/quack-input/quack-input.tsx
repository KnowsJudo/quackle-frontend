import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, CloseButton, Image, Progress, Textarea } from "@mantine/core";
import { IQuackInput } from "../../types/quacks";
import { QuackleContext } from "../../context/user-context";
import { apiUrl } from "../../api/api-url";
import "./quack-input.css";

export const QuackInput: React.FC<IQuackInput> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [quackContent, setQuackContent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [checkClose, setCheckClose] = useState<boolean>(false);
  const [savedQuack, setSavedQuack] = useState<string>("");

  const enterQuackContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setQuackContent(event.target.value);
  };

  const maxQuackLength = 300;

  useEffect(() => {
    const stored = sessionStorage.getItem("Unfinished Quack");
    if (stored) setSavedQuack(JSON.parse(stored));
  }, [savedQuack]);

  useEffect(() => {
    if (error) {
      quackContent.length < maxQuackLength && setError(false);
    }
    if (quackContent.length >= maxQuackLength) {
      setError(true);
    }
  }, [quackContent.length]);

  const submitQuack = async () => {
    if (error) {
      return;
    }
    await axios
      .post(`${apiUrl}/user/${userData.username}/quacks`, {
        name: userData.name,
        username: userData.username,
        message: quackContent,
      })
      .then((res) => {
        console.log(res);
        props.setInitiateQuack?.(false);
        setQuackContent("");
      })
      .catch((e) => console.error(e));
  };

  const closeModal = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!quackContent) {
      props.setInitiateQuack?.(false);
      return;
    }
    if (!checkClose) setCheckClose(true);
  };

  const saveQuack = () => {
    sessionStorage.setItem("Unfinished Quack", JSON.stringify(quackContent));
    setCheckClose(false);
    props.setInitiateQuack?.(false);
    setQuackContent("");
  };

  const discardQuack = () => {
    setCheckClose(false);
    props.setInitiateQuack?.(false);
    setQuackContent("");
    sessionStorage.clear();
  };

  const restoreSave = () => {
    setQuackContent(savedQuack);
    setSavedQuack("");
    sessionStorage.clear();
  };

  return (
    <section
      className={props.fixed ? "quack-input-anywhere" : "quack-input-home"}
      onMouseDown={props.fixed ? (e) => closeModal(e) : undefined}
    >
      <div
        className={props.fixed ? "input-anywhere-inner" : "input-home-inner"}
        onMouseDown={props.fixed ? (e) => e.stopPropagation() : undefined}
      >
        {props.fixed && (
          <CloseButton
            title="Close"
            size="xl"
            sx={{ marginLeft: "-10px" }}
            onMouseDown={(e) => closeModal(e)}
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
            <b>&nbsp;&nbsp;{`@${props.atUser}`}</b>
          </p>
          {savedQuack && (
            <Button
              sx={{ marginLeft: "auto" }}
              onClick={() => restoreSave()}
              variant="outline"
              color="dark"
            >
              Restore saved quack
            </Button>
          )}
        </span>
        <Textarea
          autosize
          error={error ? "Too many eggs in one basket" : undefined}
          value={quackContent}
          minRows={3}
          maxRows={props.fixed ? 7 : 10}
          placeholder="What's Quacking?"
          onChange={(e) => enterQuackContent(e)}
          variant="unstyled"
        />
        <span className="quack-submit">
          <Progress
            value={quackContent.length / 3}
            sx={{ width: "25%" }}
            color={error ? "red" : "blue"}
          />
          <Button onClick={submitQuack} disabled={!quackContent}>
            Quack!
          </Button>
        </span>
      </div>
      {checkClose && (
        <div className="save-quack" onClick={() => setCheckClose(false)}>
          <div className="confirm-save" onClick={(e) => e.stopPropagation()}>
            <h4>Save Quack?</h4>
            <span className="save-buttons">
              <Button variant="default" onClick={() => saveQuack()}>
                Save
              </Button>
              <Button variant="default" onClick={() => discardQuack()}>
                Discard
              </Button>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
