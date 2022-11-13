import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProfileProps } from "../../types/profile-details";
import { CardWithStats } from "../profile-card/profile-card";
import { QuackInput } from "../quack-input/quack-input";
import { QuacksMenu } from "../quacks-menu/quacks-menu";
import { IQuackResponse } from "../../types/quacks";
import { QuackOutput } from "../quack-output/quack-output";
import "./profile-details.css";

export const ProfileDetails: React.FC<IProfileProps> = (props) => {
  const [friendQuacks, setFriendQuacks] = useState<IQuackResponse[]>([]);

  useEffect(() => {
    if (props.profileData.friends?.length) {
      const friendQuacks = props.profileData.friends.map(
        (next) => next.username,
      );

      axios
        .get(`//localhost:3001/api/user/${friendQuacks[0]}/quacks`)
        .then((res) => {
          setFriendQuacks(res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  return props.matchesUser ? (
    <section className="profile-details">
      Home
      <QuackInput
        fixed={false}
        atUser={"everyone"}
        displayPic={props.profileData.displayPic}
      />
      <div className="profile-friend-quacks">
        {!props.profileData.friends?.length
          ? "Your pond has no other members!"
          : friendQuacks.map((next, i) => {
              return (
                <QuackOutput
                  key={i}
                  name={props.profileData.name}
                  username={next.username}
                  quackedAt={next.quackedAt}
                  content={next.message}
                  replies={[]}
                  requacks={0}
                  likes={0}
                />
              );
            })}
      </div>
    </section>
  ) : (
    <section className="profile-details">
      <div className="user-info">
        <h5 className="username-title">{props.profileData.name} on Quackle</h5>
        <CardWithStats
          image={props.profileData.displayPic}
          title={`@${props.profileData.username}`}
          description={props.profileData.tagline}
          stats={[
            {
              title: "Quacks",
              value: props.profileData.quacks.length
                ? props.profileData.quacks.length
                : 0,
            },
            {
              title: "Flock members",
              value: props.profileData.friends?.length
                ? props.profileData.friends?.length
                : 0,
            },
            {
              title: "Joined",
              value: String(props.profileData.createdAt).slice(0, 10),
            },
          ]}
        />
      </div>
      <div className="user-tweets">
        <QuacksMenu
          paramId={props.paramId}
          profileData={props.profileData}
          quackdata={props.quackData}
        />
      </div>
    </section>
  );
};
