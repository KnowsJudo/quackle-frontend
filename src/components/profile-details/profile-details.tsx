import React from "react";
import { IProfileDetails } from "../../types/profile-types";
import { CardWithStats } from "../profile-card/profile-card";
import { QuacksMenu } from "../quacks-menu/quacks-menu";
import "./profile-details.css";

export const ProfileDetails: React.FC<IProfileDetails> = (props) => {
  return (
    <section className="profile-details">
      <div className="user-info">
        <h5 className="username-title">{props.profileData.name} on Quackle</h5>
        <CardWithStats
          loggedIn={props.loggedIn}
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
          deleteQuack={props.matchesUser ? props.deleteQuack : undefined}
          loading={props.loading}
        />
      </div>
    </section>
  );
};
