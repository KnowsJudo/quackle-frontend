import React from "react";
import { IProfileDetails } from "../../types/profile-types";
import { ProfileCard } from "../profile-card/profile-card";
import { QuacksMenu } from "../quacks-menu/quacks-menu";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileFollowing } from "../profile-following/profile-following";
import { ProfileFollowers } from "../profile-followers/profile-followers";
import { Button, Tooltip } from "@mantine/core";
import { UsernameInfo } from "../username-info/username-info";
import EditIcon from "@mui/icons-material/Edit";
import "./profile-details.css";

export const ProfileDetails: React.FC<IProfileDetails> = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  return params.follow === "following" ? (
    <ProfileFollowing
      name={props.profileData.name}
      username={props.profileData.username}
    />
  ) : params.follow === "followers" ? (
    <ProfileFollowers
      name={props.profileData.name}
      username={props.profileData.username}
    />
  ) : (
    <section className="profile-details">
      <div className="user-info">
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <UsernameInfo name={props.profileData.name} />
          {props.matchesUser && (
            <span style={{ padding: " 1% 4%" }}>
              <Tooltip label="Edit profile">
                <Button
                  variant="outline"
                  color="dark"
                  onClick={() => navigate("/settings")}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
            </span>
          )}
        </span>
        <ProfileCard
          loggedIn={props.loggedIn}
          matchesUser={props.matchesUser}
          avatar={props.profileData.avatar}
          banner={props.profileData.banner}
          name={props.profileData.name}
          username={props.profileData.username}
          tagline={props.profileData.tagline}
          location={props.profileData.location}
          following={props.profileData.following}
          followers={props.profileData.followers}
          stats={[
            {
              title: "Quacks",
              value: props.profileData.quacks,
            },
            {
              title: "Choruses",
              value: props.profileData.reQuacks,
            },
            {
              title: "Hatched",
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
