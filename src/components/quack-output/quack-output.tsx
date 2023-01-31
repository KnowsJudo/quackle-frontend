import React, { useContext, useEffect, useState } from "react";
import { IQuackOutput } from "../../types/quacks";
import { Avatar, Button, Text, Tooltip } from "@mantine/core";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { Link } from "react-router-dom";
import { QuackleContext } from "../../context/user-context";
import DuckPond from "../../img/pond.png";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./quack-output.css";

export const QuackOutput: React.FC<IQuackOutput> = (props) => {
  const { userData, likeQuack, reqLoad } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [likeList, setLikeList] = useState<string>("");

  const checkLiked = props.likes.includes(userData.username);

  const calclikeList = (likes: string[]) => {
    switch (likes.length) {
      case 0: {
        setLikeList("Be the first to like this quack!");
        break;
      }
      case 1: {
        setLikeList(`Liked by ${likes}`);
        break;
      }
      case 2: {
        setLikeList(`Liked by ${likes[0]} and ${likes[1]}`);
        break;
      }
      default: {
        setLikeList(
          `Liked by ${likes[0]}, ${likes[1]} and ${likes.length - 2} other${
            likes.length - 2 > 1 ? "s" : ""
          }`,
        );
      }
    }
  };

  useEffect(() => {
    calclikeList(props.likes);
  }, [props.likes]);

  return (
    <section className="quack-output">
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title="Do you really want to delete this quack?"
        confirmFunc={() => {
          props.deleteQuack?.(props.id);
          setModal(false);
        }}
      />
      <span className="quack-output-avatar">
        <Link to={`/profile/${props.username}`}>
          <Avatar src={props.avatar} alt="user avatar" radius="xl" size="lg" />
        </Link>
      </span>
      <div className="quack-content">
        <span className="quack-user">
          <Link
            to={`/profile/${props.username}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <Text size="sm" weight="bold">
              {props.name}&nbsp;
            </Text>
          </Link>
          <Text size="xs" color="dimmed">
            @{props.username}&nbsp;
          </Text>
          <Text size="xs" color="dimmed">
            {props.quackedAt.slice(0, 10)}
          </Text>
          {props.deleteQuack && !props.loading && (
            <Tooltip label="Delete Quack">
              <Button
                color="dark"
                variant="subtle"
                size="xs"
                loading={reqLoad}
                sx={{ marginLeft: "auto" }}
                styles={{ leftIcon: { margin: "auto" } }}
                onClick={() => setModal(true)}
              >
                {!reqLoad && <DeleteIcon fontSize="small" />}
              </Button>
            </Tooltip>
          )}
        </span>
        <span className="quack-message">
          <Text
            size="sm"
            style={{
              textAlign: "initial",
              paddingBottom: "5px",
              minHeight: "130px",
              maxHeight: "280px",
              overflowY: "auto",
            }}
          >
            {props.content}
          </Text>
          {props.atUsers.length ? (
            <span className="atusers-output">
              {props.atUsers.map((next) => (
                <Link
                  key={next}
                  to={`/profile/${next}`}
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    textAlign: "initial",
                    paddingRight: "5px",
                  }}
                >{`@${next}`}</Link>
              ))}
            </span>
          ) : (
            ""
          )}
        </span>
        <span className="quack-options">
          <Tooltip label="Reply">
            <Button size="sm" color="dark" variant="subtle">
              🐔
            </Button>
          </Tooltip>
          <Tooltip label={`${props.replies.length} replies`}>
            <img className="pond-image" src={DuckPond} />
          </Tooltip>
          <Tooltip label={likeList}>
            <Button
              size="sm"
              color="dark"
              variant="subtle"
              styles={{ leftIcon: { margin: "auto" } }}
              loading={reqLoad}
              onClick={() => likeQuack(props.username, props.id, props.likes)}
            >
              {reqLoad ? (
                ""
              ) : checkLiked ? (
                <FavoriteIcon
                  fontSize="small"
                  style={{
                    marginRight: "2px",
                    color: "#1ba5a5",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  style={{
                    marginRight: "2px",
                  }}
                />
              )}
              {!reqLoad && `${props.likes.length}`}
            </Button>
          </Tooltip>
        </span>
      </div>
      <hr />
    </section>
  );
};
