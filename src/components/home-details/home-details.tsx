import React, { useContext, useEffect, useState } from "react";
import { Badge, Loader } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { QuackOutput } from "../quack-output/quack-output";
import { Link } from "react-router-dom";
import { getAvatars, getQuacks } from "../../helpers/quack-getters";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./home-details.css";

export interface IUserAvatar {
  username: string;
  avatar?: string;
}

export const HomeDetails: React.FC = () => {
  const { userData, deleteQuack } = useContext(QuackleContext);
  const [friendResponse, setFriendResponse] = useState<IQuackResponse[]>([]);
  const [friendAvatars, setFriendAvatars] = useState<IUserAvatar[]>([]);
  const [homeQuacks, setHomeQuacks] = useState<IQuackResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    getFriendQuacks();
    getFriendAvatars();
  }, [userData.quacks, userData.following]);

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
    setHomeQuacks(sortedResults);
  }, [friendResponse, friendAvatars, userData.quacks, userData.likedQuacks]);

  useEffect(() => {
    if (userData.following.length && !homeQuacks.length) {
      return;
    }
    setLoading(false);
  }, [homeQuacks]);

  return (
    <section className="home-details">
      <h4>Home</h4>
      <QuackInput fixed={false} atUsers={[]} avatar={userData.avatar} />
      <div className="home-friend-quacks">
        <HorizontalRuleRoundedIcon
          preserveAspectRatio="none"
          style={{
            height: "30px",
            width: "100%",
          }}
        />
        {loading ? (
          <Loader color="cyan" sx={{ marginTop: "18vh" }} />
        ) : !homeQuacks.length ? (
          <>
            <h6>Your pond is quiet..</h6>
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
        ) : (
          homeQuacks.map((next) => (
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
