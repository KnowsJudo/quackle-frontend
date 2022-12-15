import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { apiUrl } from "../../api/api-url";
import { QuackleContext } from "../../context/user-context";
import { IFriendQuacks, IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { QuackOutput } from "../quack-output/quack-output";
import { Link } from "react-router-dom";
import { IImage } from "../../types/user-types";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./home-details.css";

interface IUserAvatar {
  username: string;
  avatar?: IImage;
}

export const HomeDetails: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [friendResponse, setFriendResponse] = useState<IQuackResponse[]>([]);
  const [friendAvatars, setFriendAvatars] = useState<IUserAvatar[]>([]);
  const [friendQuacks, setFriendQuacks] = useState<IFriendQuacks[]>([]);

  const getFriendQuacks = async () => {
    if (!userData.following?.length) {
      return;
    }
    try {
      const promises = userData.following.map((next) => {
        return axios.get(`${apiUrl}/user/${next}/quacks`).then((res) => {
          return res.data;
        });
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
      const promises = userData.following.map((next) => {
        return axios.get(`${apiUrl}/user/${next}`).then((res) => {
          return res.data;
        });
      });
      const results = await Promise.all(promises);
      const transformed = results.map((next) => {
        return {
          username: next.username,
          avatar: next.avatar,
        };
      });
      setFriendAvatars(transformed);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriendQuacks();
    getFriendAvatars();
  }, []);

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
  }, [friendResponse, friendAvatars]);

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
            />
          ))
        )}
      </div>
    </section>
  );
};
