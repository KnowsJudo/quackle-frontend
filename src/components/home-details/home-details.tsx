import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { apiUrl } from "../../api/api-url";
import { QuackleContext } from "../../context/user-context";
import { IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { QuackOutput } from "../quack-output/quack-output";
import { Link } from "react-router-dom";
import "./home-details.css";

export const HomeDetails: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [friendQuacks, setFriendQuacks] = useState<IQuackResponse[]>([]);

  useEffect(() => {
    const getFriendQuacks = async () => {
      if (!userData.following?.length) {
        return;
      }
      console.log("friends", userData.following);
      try {
        setLoading(true);
        const promises = userData.following.map((next) => {
          return axios.get(`${apiUrl}/user/${next}/quacks`).then((res) => {
            setLoading(false);
            return res.data;
          });
        });
        const results = await Promise.all(promises);
        const sortedResults = results
          .flat()
          .sort(
            (a: IQuackResponse, b: IQuackResponse) =>
              Date.parse(a.quackedAt) - Date.parse(b.quackedAt),
          )
          .reverse();
        setFriendQuacks(sortedResults);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getFriendQuacks();
  }, [userData.following]);

  return (
    <section className="home-details">
      <h4>Home</h4>
      <QuackInput fixed={false} atUser={"everyone"} avatar={userData.avatar} />
      <div className="home-friend-quacks">
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
