import React, { useContext, useEffect, useState } from "react";
import { Badge, Loader } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { IFriendQuacks, IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { QuackOutput } from "../quack-output/quack-output";
import { Link } from "react-router-dom";
import { IImage } from "../../types/user-types";
import { getAvatars, getQuacks } from "../../helpers/quack-getters";
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
    const quacks = await getQuacks(userData.following, userData.username);
    quacks && setFriendResponse(quacks);
  };

  const getFriendAvatars = async () => {
    const avatars: IUserAvatar[] | undefined = await getAvatars(
      userData.following,
      userData.username,
    );
    avatars && setFriendAvatars(avatars);
  };

  useEffect(() => {
    setLoading(true);
    getFriendQuacks();
    getFriendAvatars();
    setLoading(false);
  }, [userData.quacks, userData.likedQuacks]);

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
  }, [friendResponse, friendAvatars, userData.quacks, userData.likedQuacks]);

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
            <Badge
              size="lg"
              radius="xl"
              style={{
                margin: "auto",
                padding: "25px",
                backgroundColor: "#282c34",
              }}
            >
              <Link
                to="/trending"
                style={{ color: "white", textDecoration: "none" }}
              >
                See popular ducks
              </Link>
            </Badge>
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
              atUser={next.atUser}
              replies={[]}
              requacks={0}
              likes={next.likes}
              loading={loading}
              loggedIn={true}
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
