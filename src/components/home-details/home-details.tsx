import React, { useContext, useEffect, useState } from "react";
import { Badge, Loader } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { QuackOutput } from "../quack-output/quack-output";
import { Link } from "react-router-dom";
import { getQuacks } from "../../helpers/quack-getters";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./home-details.css";

export interface IUserAvatar {
  username: string;
  avatar?: string;
}

export const HomeDetails: React.FC = () => {
  const { userData, deleteQuack } = useContext(QuackleContext);
  const [homeQuacks, setHomeQuacks] = useState<IQuackResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getHomeQuacks = async () => {
    const quacks = await getQuacks(userData.following, userData.username);
    if (!quacks) {
      setLoading(false);
      return;
    }
    const sortedResults = quacks
      .sort(
        (a: IQuackResponse, b: IQuackResponse) =>
          Date.parse(a.quackedAt) - Date.parse(b.quackedAt),
      )
      .reverse();
    setHomeQuacks(sortedResults);
    setLoading(false);
  };

  useEffect(() => {
    getHomeQuacks();
  }, [userData.quacks, userData.following, userData.likedQuacks]);

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
        {!loading && !homeQuacks.length && (
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
        )}
        {loading ? (
          <Loader color="cyan" sx={{ marginTop: "18vh" }} />
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
