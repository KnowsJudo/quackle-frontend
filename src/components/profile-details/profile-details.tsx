import React from "react";
import { IProfileProps } from "../../types/profile-details";
import { CardWithStats } from "../profile-card/profile-card";
import { QuackInput } from "../quack-input/quack-input";
import { QuacksMenu } from "../quacks-menu/quacks-menu";

export const ProfileDetails: React.FC<IProfileProps> = (props) => {
  return props.matchesUser ? (
    <section className="profile-details">
      <QuackInput
        fixed={false}
        atUser={"everyone"}
        displayPic={props.profileData.displayPic}
      />
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
