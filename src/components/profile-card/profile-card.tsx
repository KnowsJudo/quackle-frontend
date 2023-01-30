import React, { useContext } from "react";
import { Avatar, Card, Group, Image, Text, Tooltip } from "@mantine/core";
import { IProfileCard } from "../../types/profile-types";
import { Link } from "react-router-dom";
import { QuackleContext } from "../../context/user-context";
import { FollowButton } from "../follow-button/follow-button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./profile-card.css";

export const ProfileCard: React.FC<IProfileCard> = (props) => {
  const { userData, loggedIn } = useContext(QuackleContext);

  const followingData = {
    username: userData.username,
    followingName: props.name,
    followingUsername: props.username,
    followingAvatar: props.avatar,
    followingTagline: props.tagline,
  };

  const followerData = {
    followerName: userData.name,
    followerUsername: userData.username,
    followerAvatar: userData?.avatar,
    followerTagline: userData?.tagline,
  };

  const isUserFollowing = userData.following.find(
    (next) => next === props.username,
  );

  return (
    <Card withBorder p="lg">
      <Card.Section>
        <Image
          alt="This user has no banner"
          height={150}
          src={props.banner}
          sx={{ objectFit: "contain" }}
          withPlaceholder
        />
      </Card.Section>

      <div className="card-group">
        <span className="card-avatar">
          <Avatar
            size="xl"
            src={props.avatar}
            alt="This user has no avatar"
            style={{ border: "solid 4px white", borderRadius: "50%" }}
          />
          &nbsp;
          <Text size="md" color="dimmed">
            @{props.username}
          </Text>
        </span>
        <Group spacing={5}>
          {!props.matchesUser && (
            <Tooltip
              disabled={props.loggedIn}
              label={!props.loggedIn && "Log in to get updates from this user"}
            >
              <span>
                <FollowButton
                  buttonOwner={props.username}
                  disabled={!loggedIn}
                  isUserFollowing={isUserFollowing}
                  followingData={followingData}
                  followerData={followerData}
                />
              </span>
            </Tooltip>
          )}
        </Group>
      </div>
      <Text mt="sm" mb="md" size="xs" sx={{ textAlign: "left" }}>
        {props.tagline}
      </Text>
      <span className="card-info">
        <span className="card-follow">
          <Link
            to={
              props.loggedIn
                ? `/profile/${props.username}/following`
                : `/profile/${props.username}`
            }
            style={{ color: "black", textDecoration: "none" }}
          >
            <Text size="sm" color="dimmed">
              Following
            </Text>
            <Text size="sm" weight="bold">
              {props.following?.length}
            </Text>
          </Link>
          <Link
            to={
              props.loggedIn
                ? `/profile/${props.username}/followers`
                : `/profile/${props.username}`
            }
            style={{
              color: "black",
              textDecoration: "none",
              marginLeft: "2em",
            }}
          >
            <Text size="sm" color="dimmed">
              Followers
            </Text>
            <Text size="sm" weight="bold">
              {props.followers?.length}
            </Text>
          </Link>
        </span>
        <span className="card-location">
          {props.location && (
            <>
              <Text size="sm" color="dimmed">
                <Tooltip label={`${props.username}'s location`}>
                  <LocationOnIcon />
                </Tooltip>
              </Text>
              <Text size="sm">{props.location}</Text>
            </>
          )}
        </span>
      </span>
      <Card.Section className="card-footer">
        {props.stats.map((next) => (
          <div key={next.title}>
            <Text size="xs" color="dimmed">
              {next.title}
            </Text>
            <Text weight={500} size="sm">
              {next.value}
            </Text>
          </div>
        ))}
      </Card.Section>
    </Card>
  );
};
