import React, { useState } from "react";
import { Tabs } from "@mantine/core";

export const QuacksMenu: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>("quacks");

  return (
    <Tabs value={selectedTab} onTabChange={setSelectedTab}>
      <Tabs.List>
        <Tabs.Tab value="quacks" color={"#fff"}>
          Quacks
        </Tabs.Tab>
        <Tabs.Tab value="requacks" color={"white"}>
          Re-Quacks
        </Tabs.Tab>
        <Tabs.Tab value="likes">Likes</Tabs.Tab>
        <Tabs.Tab value="media">Media</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="quacks">ALLO</Tabs.Panel>
      <Tabs.Panel value="requacks">RES</Tabs.Panel>
      <Tabs.Panel value="likes">LIKE</Tabs.Panel>
      <Tabs.Panel value="media">PICS</Tabs.Panel>
    </Tabs>
  );
};
