import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, Loader, Tabs, Text, Textarea } from "@mantine/core";
import {
  IEmptyQuackMenu,
  IQuackResponse,
  IQuacksMenu,
} from "../../types/quacks";
import { QuackOutput } from "../quack-output/quack-output";
import { QuackleContext } from "../../context/user-context";
import { apiUrl } from "../../helpers/api-url";
import { stdHeader } from "../../helpers/api-header";
import { showNotification } from "@mantine/notifications";
import EditIcon from "@mui/icons-material/Edit";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import "./quacks-menu.css";

export const QuacksMenu: React.FC<IQuacksMenu> = (props) => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [biography, setBiography] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const paramId = props.paramId;

  const submitBio = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `${apiUrl}/user/${userData.username}`,
        {
          option: "biography",
          setting: biography,
        },
        stdHeader(),
      );
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
      setEdit(false);
      setLoading(false);
      showNotification({
        message: `Biography updated`,
        icon: <DoneIcon />,
        color: "cyan",
        styles: () => ({
          root: {
            borderColor: "#282c34",
            textTransform: "capitalize",
          },
        }),
      });
    } catch (error) {
      setLoading(false);
      showNotification({
        message: `Failed to update biography`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      console.error(`Could not update biography`, error);
    }
  };

  const EmptyQuacks: React.FC<IEmptyQuackMenu> = (props) => {
    if (!userData.username || userData.username !== paramId) {
      return (
        <h6>
          This user has no&nbsp;
          {props.quack
            ? "quacks"
            : props.likes
            ? "likes"
            : props.pond
            ? "ponds"
            : "biography"}
        </h6>
      );
    }

    if (props.bio && userData.username === paramId) {
      return (
        <>
          <Text size="md" color="dimmed">
            Enter your biography
          </Text>
          <Button variant="outline" color="dark" onClick={() => setEdit(true)}>
            <EditIcon />
          </Button>
        </>
      );
    }

    return (
      <h6>
        You havent&nbsp;
        {props.quack ? "quacked" : props.likes ? "liked" : "pondered"}
        &nbsp;anything yet!
      </h6>
    );
  };

  return (
    <Tabs
      value={props.selectedTab}
      onTabChange={props.setSelectedTab}
      sx={{ flex: "1 1 auto", maxWidth: "100%" }}
    >
      <Tabs.List sx={{ justifyContent: "space-evenly" }}>
        <Tabs.Tab color="cyan" value="quacks">
          Quacks
        </Tabs.Tab>
        <Tabs.Tab color="cyan" value="pond">
          Pond
        </Tabs.Tab>
        <Tabs.Tab color="cyan" value="likes">
          Likes
        </Tabs.Tab>
        <Tabs.Tab color="cyan" value="bio">
          Bio
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="quacks">
        {props.loading.quacks ? (
          <Loader color="cyan" sx={{ margin: "18vh auto" }} />
        ) : !props.quackdata.length ? (
          <EmptyQuacks quack={true} />
        ) : (
          props.quackdata.map((next: IQuackResponse, i) => {
            return (
              <QuackOutput
                key={i}
                id={next._id}
                name={props.profileData.name}
                username={next.username}
                avatar={props.profileData.avatar}
                quackedAt={next.quackedAt}
                content={next.content}
                atUsers={next.atUsers}
                replies={next.replies}
                likes={next.likes}
                deleteQuack={props.deleteQuack}
                loading={props.loading.quacks}
                loggedIn={props.loggedIn}
              />
            );
          })
        )}
      </Tabs.Panel>
      <Tabs.Panel value="pond">
        <EmptyQuacks pond={true} />
      </Tabs.Panel>
      <Tabs.Panel value="likes">
        {props.loading.likes ? (
          <Loader color="cyan" sx={{ margin: "18vh auto" }} />
        ) : !props.likesData.length ? (
          <EmptyQuacks likes={true} />
        ) : (
          props.likesData.map((next: IQuackResponse, i) => {
            return (
              <QuackOutput
                key={i}
                id={next._id}
                name={next.name}
                username={next.username}
                avatar={next.avatar}
                quackedAt={next.quackedAt}
                content={next.content}
                atUsers={next.atUsers}
                replies={[]}
                likes={next.likes}
                deleteQuack={undefined}
                loading={props.loading.likes}
                loggedIn={props.loggedIn}
              />
            );
          })
        )}
      </Tabs.Panel>
      <Tabs.Panel value="bio">
        {loading ? (
          <Loader color="cyan" sx={{ margin: "18vh auto" }} />
        ) : !props.profileData.biography && !edit ? (
          <EmptyQuacks bio={true} />
        ) : (
          <div className="biography-contents">
            <HorizontalRuleRoundedIcon
              preserveAspectRatio="none"
              style={{
                height: "30px",
                width: "100%",
              }}
            />
            <Text size="md" color={edit ? "dimmed" : "dark"}>
              {props.profileData.biography}
            </Text>
            {edit && (
              <>
                <Textarea
                  placeholder="Enter your bio"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
                <Button
                  variant="outline"
                  color="dark"
                  onClick={() => submitBio()}
                >
                  Update
                </Button>
              </>
            )}
            {!edit && userData.username === props.profileData.username && (
              <Button
                variant="outline"
                color="dark"
                onClick={() => setEdit(true)}
              >
                <EditIcon />
              </Button>
            )}
            <HorizontalRuleRoundedIcon
              preserveAspectRatio="none"
              style={{
                height: "30px",
                width: "100%",
              }}
            />
          </div>
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
