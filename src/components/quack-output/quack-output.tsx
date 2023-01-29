import React, { useContext, useEffect, useState } from "react";
import { IQuackOutput } from "../../types/quacks";
import { Avatar, Button, Text, Tooltip } from "@mantine/core";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { useImage } from "../../helpers/use-image";
import { Link } from "react-router-dom";
import { QuackleContext } from "../../context/user-context";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./quack-output.css";

export const QuackOutput: React.FC<IQuackOutput> = (props) => {
  const { userData, likeQuack, reqLoad } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [likeList, setLikeList] = useState<string>("");
  const avatarSrc = useImage(props.avatar);

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
          <Avatar src={avatarSrc} alt="user avatar" radius="xl" size="lg" />
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
              maxHeight: "220px",
              overflowY: "auto",
            }}
          >
            {props.content}
          </Text>
          {props.atUser !== "everyone" && (
            <Link
              to={`/profile/${props.atUser}`}
              style={{
                textDecoration: "none",
                fontSize: "14px",
                textAlign: "initial",
              }}
            >{`@${props.atUser}`}</Link>
          )}
        </span>
        <span className="quack-options">
          <Tooltip label={`${props.replies.length} replies`}>
            <Button
              size="sm"
              color="dark"
              variant="subtle"
              disabled
            >{`🐤 ${props.replies.length}`}</Button>
          </Tooltip>
          <Tooltip label={`${props.requacks} re-quacks`}>
            <Button
              size="sm"
              color="dark"
              variant="subtle"
              disabled
            >{`🐔 ${props.requacks}`}</Button>
          </Tooltip>
          <Tooltip label={likeList}>
            <Button
              size="sm"
              color="dark"
              variant="subtle"
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
