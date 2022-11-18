import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { apiUrl } from "../../api/api-url";
import { QuackleContext } from "../../context/user-context";
import { IQuackResponse } from "../../types/quacks";
import { QuackInput } from "../quack-input/quack-input";
import { QuackOutput } from "../quack-output/quack-output";
import "./home-details.css";

export const HomeDetails: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [friendQuacks, setFriendQuacks] = useState<IQuackResponse[]>([]);

  useEffect(() => {
    if (!userData.friends?.length) {
      return;
    }

    const friendNames = userData.friends.map((next) => next.username);
    setLoading(true);
    axios
      .get(`${apiUrl}/user/${friendNames[0]}/quacks`)
      .then((res) => {
        setFriendQuacks(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <section className="home-details">
      <h4>Home</h4>
      <QuackInput
        fixed={false}
        atUser={"everyone"}
        displayPic={userData.displayPic}
      />
      <div className="home-friend-quacks">
        {!userData.friends?.length ? (
          <h6>Your pond has no other members!</h6>
        ) : loading ? (
          <Loader sx={{ marginTop: "25vh" }} />
        ) : (
          friendQuacks.map((next) => {
            return (
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
            );
          })
        )}
      </div>
    </section>
  );
};
