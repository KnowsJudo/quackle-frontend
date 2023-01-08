import React, { useContext, useState } from "react";
import { Loader, Tabs } from "@mantine/core";
import {
  IEmptyQuackMenu,
  IQuackResponse,
  IQuacksMenu,
} from "../../types/quacks";
import { QuackOutput } from "../quack-output/quack-output";
import { QuackleContext } from "../../context/user-context";
import "./quacks-menu.css";

export const QuacksMenu: React.FC<IQuacksMenu> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [selectedTab, setSelectedTab] = useState<string | null>("quacks");
  const paramId = props.paramId;

  const EmptyQuacks: React.FC<IEmptyQuackMenu> = (props) => {
    if (!userData.username || userData.username !== paramId) {
      return (
        <h6>
          This user has no&nbsp;
          {props.likes ? "likes!" : `${props.requack ? "re-" : ""}quacks!`}
        </h6>
      );
    }

    return (
      <h6>
        You havent&nbsp;
        {props.likes ? "liked" : `${props.requack ? "re-" : ""}quacked`}
        &nbsp;anything yet!
      </h6>
    );
  };

  return (
    <Tabs
      value={selectedTab}
      onTabChange={setSelectedTab}
      sx={{ flex: "1 1 auto" }}
    >
      <Tabs.List sx={{ justifyContent: "space-evenly" }}>
        <Tabs.Tab value="quacks">Quacks</Tabs.Tab>
        <Tabs.Tab value="requacks">Re-Quacks</Tabs.Tab>
        <Tabs.Tab value="likes">Likes</Tabs.Tab>
        <Tabs.Tab value="media">Media</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="quacks">
        {props.loading ? (
          <Loader sx={{ marginTop: "25vh" }} />
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
                content={next.message}
                atUser={next.atUser}
                replies={[]}
                requacks={0}
                likes={next.likes}
                deleteQuack={props.deleteQuack}
                loading={props.loading}
                loggedIn={props.loggedIn}
              />
            );
          })
        )}
      </Tabs.Panel>
      <Tabs.Panel value="requacks">
        <EmptyQuacks requack={true} />
      </Tabs.Panel>
      <Tabs.Panel value="likes">
        <EmptyQuacks likes={true} />
      </Tabs.Panel>
      <Tabs.Panel value="media">
        <EmptyQuacks quack={true} />
      </Tabs.Panel>
    </Tabs>
  );
};
