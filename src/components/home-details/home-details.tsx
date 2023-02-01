import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../helpers/api-url";
import { QuackleContext } from "../../context/user-context";
import { IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { getQuacks } from "../../helpers/quack-getters";
import { HomeMenu } from "../home-menu/home-menu";
import { Text } from "@mantine/core";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./home-details.css";

export interface IUserAvatar {
  username: string;
  avatar?: string;
}

export interface IHomeLoading {
  pond: boolean;
  focused: boolean;
}

export const HomeDetails: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [pondQuacks, setPondQuacks] = useState<IQuackResponse[]>([]);
  const [focusedQuacks, setFocusedQuacks] = useState<IQuackResponse[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>("pond");
  const [loading, setLoading] = useState<IHomeLoading>({
    pond: true,
    focused: true,
  });

  const getHomeQuacks = async () => {
    const quacks = await getQuacks(
      userData.following,
      false,
      userData.username,
    );
    if (!quacks) {
      setLoading((prev) => {
        return {
          ...prev,
          pond: false,
        };
      });
      return;
    }
    const sortedResults = quacks
      .sort(
        (a: IQuackResponse, b: IQuackResponse) =>
          Date.parse(a.quackedAt) - Date.parse(b.quackedAt),
      )
      .reverse();
    setPondQuacks(sortedResults);
    setLoading((prev) => {
      return {
        ...prev,
        pond: false,
      };
    });
  };

  useEffect(() => {
    getHomeQuacks();
  }, [userData.quacks, userData.following, userData.likedQuacks]);

  const getFocusedQuacks = async () => {
    try {
      const quacks = await axios.get(
        `${apiUrl}/focused/${userData.username}/quacks`,
      );
      setFocusedQuacks(quacks.data);
      setLoading((prev) => {
        return {
          ...prev,
          focused: false,
        };
      });
    } catch (error) {
      setLoading((prev) => {
        return {
          ...prev,
          focused: false,
        };
      });
      console.error(error);
    }
  };

  const focusedRef = useRef("initalLoad");

  useEffect(() => {
    if (focusedRef.current !== "initalLoad") {
      return;
    }
    if (selectedTab === "focused") {
      getFocusedQuacks();
      focusedRef.current = "loaded";
    }
  }, [selectedTab]);

  useEffect(() => {
    if (focusedRef.current === "initalLoad") {
      return;
    }
    getFocusedQuacks();
  }, [userData.quacks]);

  return (
    <section className="home-details">
      <span className="home-title">
        <Text sx={{ fontSize: "22px" }}>
          <b>Pond</b>
        </Text>
      </span>
      <QuackInput fixed={false} avatar={userData.avatar} />
      <div className="home-friend-quacks">
        <HorizontalRuleRoundedIcon
          preserveAspectRatio="none"
          style={{
            height: "30px",
            width: "100%",
          }}
        />
        <HomeMenu
          pondQuacks={pondQuacks}
          focusedQuacks={focusedQuacks}
          loading={loading}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </section>
  );
};
