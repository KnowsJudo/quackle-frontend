import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Chip,
  CloseButton,
  Loader,
  Progress,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IQuackInput } from "../../types/quacks";
import { QuackleContext } from "../../context/user-context";
import { apiUrl } from "../../helpers/api-url";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { showNotification } from "@mantine/notifications";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { stdHeader } from "../../helpers/api-header";
import { debounce } from "../../helpers/debounce";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import "./quack-input.css";

export const QuackInput: React.FC<IQuackInput> = (props) => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [quackContent, setQuackContent] = useState<string>("");
  const [atNextUser, setAtNextUser] = useState<string>("");
  const [userToAdd, setUserToAdd] = useState<string>("");
  const [atUsers, setAtUsers] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [checkClose, setCheckClose] = useState<boolean>(false);
  const [savedQuack, setSavedQuack] = useState<string>("");
  const [searchLoad, setSearchLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const enterQuackContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setQuackContent(event.target.value);
  };

  const maxQuackLength = 300;

  useEffect(() => {
    const stored = sessionStorage.getItem("Unfinished-Quack");
    stored && setSavedQuack(stored);
  }, [savedQuack]);

  useEffect(() => {
    if (error) {
      quackContent.length < maxQuackLength && setError(false);
    }
    if (quackContent.length >= maxQuackLength) {
      setError(true);
    }
  }, [quackContent]);

  const searchNextUser = useMemo(
    () =>
      debounce(async (nextUser: string) => {
        try {
          const data = await axios.get(`${apiUrl}/search/${nextUser}`);
          const user = data.data.username;
          setUserToAdd(user);
          setSearchLoad(false);
        } catch (error) {
          setUserToAdd("");
          setSearchLoad(false);
          console.log(error);
        }
      }, 200),
    [],
  );

  useEffect(() => {
    if (atNextUser.length < 3 || atNextUser.length > 15) {
      return;
    }
    if (!userToAdd) {
      setSearchLoad(true);
    }
    searchNextUser(atNextUser);
  }, [atNextUser]);

  const addNextUser = async (user: string, add: boolean) => {
    if (!add) {
      setAtUsers((prev) => prev.filter((match) => match !== user));
      return;
    }
    if (atUsers.find((match) => match === user)) {
      return;
    }
    if (atUsers.length > 5) {
      showNotification({
        message: `Maximum taggable users reached`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      return;
    }
    try {
      const data = await axios.get(`${apiUrl}/search/${user}`);
      if (atUsers.find((match) => match === data.data.username)) {
        return;
      }
      setAtUsers((prev) => [...prev, data.data.username]);
      setAtNextUser("");
      setUserToAdd("");
    } catch (error) {
      showNotification({
        message: `Could not find user`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      console.error(error);
    }
  };

  const submitQuack = async () => {
    if (error) {
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${apiUrl}/user/${userData.username}/quacks`,
        {
          userId: userData.id,
          name: userData.name,
          content: quackContent,
          avatar: userData.avatar,
          atUsers,
        },
        stdHeader(),
      );
      props.setInitiateQuack?.(false);
      setQuackContent("");
      setAtUsers([]);
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
      setLoading(false);
      showNotification({
        message: "Quacked!",
        icon: <AiFillDingtalkCircle />,
        color: "cyan",
        styles: () => ({
          root: { backgroundColor: "#282c34", borderColor: "#282c34" },
          description: { color: "white" },
          closeButton: {
            color: "white",
          },
        }),
      });
    } catch (error) {
      setLoading(false);
      showNotification({
        message: `Failed to post Quack.`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      console.error(error);
    }
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
    sessionStorage.setItem(
      "Unfinished-Quack",
      JSON.stringify({ atUsers, quackContent }),
    );
    setCheckClose(false);
    props.setInitiateQuack?.(false);
    setAtUsers([]);
    setQuackContent("");
  };

  const discardQuack = () => {
    setCheckClose(false);
    props.setInitiateQuack?.(false);
    setAtUsers([]);
    setQuackContent("");
    sessionStorage.removeItem("Unfinished-Quack");
  };

  const restoreSave = () => {
    const saved = JSON.parse(savedQuack);
    setAtUsers(saved.atUsers);
    setQuackContent(saved.quackContent);
    setSavedQuack("");
    sessionStorage.removeItem("Unfinished-Quack");
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
          <Avatar size="lg" src={props.avatar} radius="xl" />
          &nbsp; &nbsp;
          <span className="at-users">
            <span className="at-input">
              @
              <Tooltip
                label="Edit quack recipients"
                style={{ textAlign: "left" }}
              >
                <TextInput
                  size="md"
                  variant="unstyled"
                  onChange={(e) => setAtNextUser(e.target.value)}
                  placeholder={
                    !props.targeted && !atUsers.length
                      ? "everyone"
                      : props.targeted && !atUsers.length
                      ? props.targeted
                      : ""
                  }
                  value={atNextUser}
                />
              </Tooltip>
              {searchLoad && <Loader color="cyan" size="xs" />}
            </span>
            <span className="chip-output">
              {userToAdd && (
                <Chip
                  checked={false}
                  disabled={searchLoad}
                  value={atNextUser}
                  onClick={() => addNextUser(userToAdd, true)}
                  sx={{ marginRight: 10 }}
                >
                  {userToAdd}
                </Chip>
              )}

              {atUsers.length ? (
                <Chip.Group position="left">
                  {atUsers.map((next) => (
                    <Chip
                      key={next}
                      value={next}
                      defaultChecked
                      color="dark"
                      onClick={() => addNextUser(next, false)}
                    >
                      {next}
                    </Chip>
                  ))}
                </Chip.Group>
              ) : (
                ""
              )}
            </span>
          </span>
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
            color={error ? "red" : "cyan"}
          />
          <Button
            onClick={submitQuack}
            disabled={!quackContent}
            color="teal"
            loading={loading}
            styles={{ leftIcon: { margin: "auto" } }}
          >
            {!loading && "Quack!"}
          </Button>
        </span>
      </div>
      <ConfirmModal
        modal={checkClose}
        setModal={setCheckClose}
        title={"Save Quack?"}
        confirmFunc={saveQuack}
        rejectFunc={discardQuack}
      />
    </section>
  );
};
