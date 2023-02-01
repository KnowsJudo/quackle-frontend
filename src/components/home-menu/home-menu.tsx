import React, { useContext } from "react";
import { Loader, Tabs } from "@mantine/core";
import { IQuackResponse } from "../../types/quacks";
import { QuackOutput } from "../quack-output/quack-output";
import { QuackleContext } from "../../context/user-context";
import { IHomeLoading } from "../home-details/home-details";
import { TrendingBadge } from "../trending-badge/trending-badge";

interface IHomeMenu {
  pondQuacks: IQuackResponse[];
  focusedQuacks: IQuackResponse[];
  loading: IHomeLoading;
  selectedTab: string | null;
  setSelectedTab: React.Dispatch<React.SetStateAction<string | null>>;
}

export const HomeMenu: React.FC<IHomeMenu> = (props) => {
  const { userData, deleteQuack } = useContext(QuackleContext);

  return (
    <Tabs
      value={props.selectedTab}
      onTabChange={props.setSelectedTab}
      sx={{ flex: "1 1 auto", maxWidth: "100%" }}
    >
      <Tabs.List sx={{ justifyContent: "space-evenly" }}>
        <Tabs.Tab color="cyan" value="pond">
          Pond
        </Tabs.Tab>
        <Tabs.Tab color="cyan" value="focused">
          Focused
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="pond">
        {props.loading.pond ? (
          <Loader color="cyan" sx={{ margin: "18vh auto" }} />
        ) : !props.pondQuacks.length ? (
          <>
            <h6>Your pond is quiet..</h6>
            <TrendingBadge />
          </>
        ) : (
          props.pondQuacks.map((next: IQuackResponse) => {
            return (
              <QuackOutput
                key={next._id}
                id={next._id}
                name={next.name}
                username={next.username}
                avatar={next.avatar}
                quackedAt={next.quackedAt}
                content={next.content}
                atUsers={next.atUsers}
                replies={next.replies}
                likes={next.likes}
                loading={props.loading.pond}
                loggedIn={true}
                deleteQuack={
                  next.username === userData.username ? deleteQuack : undefined
                }
              />
            );
          })
        )}
      </Tabs.Panel>
      <Tabs.Panel value="focused">
        {props.loading.focused ? (
          <Loader color="cyan" sx={{ margin: "18vh auto" }} />
        ) : !props.focusedQuacks.length ? (
          <h6>No-one quacking at you yet</h6>
        ) : (
          props.focusedQuacks.map((next: IQuackResponse) => {
            return (
              <QuackOutput
                key={next._id}
                id={next._id}
                name={next.name}
                username={next.username}
                avatar={next.avatar}
                quackedAt={next.quackedAt}
                content={next.content}
                atUsers={next.atUsers}
                replies={next.replies}
                likes={next.likes}
                loading={props.loading.focused}
                loggedIn={true}
                deleteQuack={undefined}
              />
            );
          })
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
