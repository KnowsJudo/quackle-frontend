import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { apiUrl } from "../../helpers/api-url";
import { QuackleContext } from "../../context/user-context";
import { IFriendQuacks, IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { QuackOutput } from "../quack-output/quack-output";
import { Link } from "react-router-dom";
import { IImage } from "../../types/user-types";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./home-details.css";

export interface IUserAvatar {
  username: string;
  avatar?: IImage;
}

export const HomeDetails: React.FC = () => {
  const { userData, deleteQuack } = useContext(QuackleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [friendResponse, setFriendResponse] = useState<IQuackResponse[]>([]);
  const [friendAvatars, setFriendAvatars] = useState<IUserAvatar[]>([]);
  const [friendQuacks, setFriendQuacks] = useState<IFriendQuacks[]>([]);

  const getFriendQuacks = async () => {
    setLoading(true);
    if (!userData.following?.length) {
      return;
    }
    try {
      const promises = userData.following
        .concat([userData.username])
        .map(async (next) => {
          const res = await axios.get(`${apiUrl}/user/${next}/quacks`);
          return res.data;
        });
      const results = await Promise.all(promises);
      const responses = results.flat();
      setFriendResponse(responses);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getFriendAvatars = async () => {
    if (!userData.following?.length) {
      return;
    }
    try {
      const promises = userData.following
        .concat([userData.username])
        .map(async (next) => {
          const res = await axios.get(`${apiUrl}/user/${next}`);
          return res.data;
        });
      const results = await Promise.all(promises);
      const transformed = results.map((next) => {
        return {
          username: next.username,
          avatar: next.avatar,
        };
      });
      setFriendAvatars(transformed);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriendQuacks();
    getFriendAvatars();
  }, [userData.quacks]);

  useEffect(() => {
    if (!friendResponse || !friendAvatars) {
      return;
    }
    const combinedArray = friendResponse.map((next) => {
      const combined = friendAvatars.find(
        (match) => match.username === next.username,
      );
      return { ...next, ...combined };
    });
    const sortedResults = combinedArray
      .sort(
        (a: IQuackResponse, b: IQuackResponse) =>
          Date.parse(a.quackedAt) - Date.parse(b.quackedAt),
      )
      .reverse();
    setFriendQuacks(sortedResults);
    setLoading(false);
  }, [friendResponse, friendAvatars, userData.quacks]);

  return (
    <section className="home-details">
      <h4>Home</h4>
      <QuackInput fixed={false} atUser={"everyone"} avatar={userData.avatar} />
      <div className="home-friend-quacks">
        <HorizontalRuleRoundedIcon
          preserveAspectRatio="none"
          style={{
            height: "30px",
            width: "100%",
          }}
        />
        {!userData.following?.length ? (
          <>
            <h6>Your pond is empty!</h6>
            <Link
              to="/trending"
              style={{ color: "black", textDecoration: "none" }}
            >
              See popular ducks
            </Link>
          </>
        ) : loading ? (
          <Loader sx={{ marginTop: "25vh" }} />
        ) : (
          friendQuacks.map((next) => (
            <QuackOutput
              key={next._id}
              id={next._id}
              name={next.name}
              username={next.username}
              avatar={next.avatar}
              quackedAt={next.quackedAt}
              content={next.message}
              replies={[]}
              requacks={0}
              likes={0}
              loading={loading}
              deleteQuack={
                next.username === userData.username ? deleteQuack : undefined
              }
            />
          ))
        )}
      </div>
    </section>
  );
};
