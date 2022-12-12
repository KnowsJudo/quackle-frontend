import React, { useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { IProfileCard } from "../../types/profile-types";
import { Link } from "react-router-dom";
import { useImage } from "../../api/use-image";
import { followUser } from "../../api/follow-user";
import { QuackleContext } from "../../context/user-context";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./profile-card.css";

export const ProfileCard: React.FC<IProfileCard> = (props) => {
  const { userData } = useContext(QuackleContext);

  const avatarSrc = useImage(props.avatar);
  const bannerSrc = useImage(props.banner);

  const followingData = {
    username: userData.username,
    followingName: props.name,
    followingUsername: props.username,
    followingAvatar: props.avatar?.data,
    followingTagline: props.description,
  };

  const followerData = {
    followerName: userData.name,
    followerUsername: userData.username,
    followerAvatar: userData?.avatar?.data,
    followerTagline: userData?.tagline,
  };

  return (
    <Card withBorder p="lg">
      <Card.Section>
        <Image
          alt="This user has no banner"
          height={150}
          src={bannerSrc}
          sx={{ objectFit: "contain" }}
          withPlaceholder
        />
      </Card.Section>

      <div className="card-group">
        <span className="card-avatar">
          <Avatar
            size="xl"
            src={avatarSrc}
            alt="This user has no avatar"
            radius={50}
          />
          &nbsp;
          <Text size="sm" weight={700}>
            @{props.username}
          </Text>
        </span>
        <Group spacing={5}>
          {!props.matchesUser && (
            <Tooltip
              label={
                props.loggedIn
                  ? `Click to Follow ${props.username}`
                  : "Log in to get updates from this user"
              }
            >
              <span>
                <Button
                  disabled={!props.loggedIn}
                  onClick={() => {
                    followUser(followingData, followerData);
                  }}
                >
                  Follow
                </Button>
              </span>
            </Tooltip>
          )}
        </Group>
      </div>
      <Text mt="sm" mb="md" size="xs" sx={{ textAlign: "left" }}>
        {props.description}
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
              8
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
              7465
            </Text>
          </Link>
        </span>
        <span className="card-location">
          {props.location && (
            <>
              <Text size="sm" color="dimmed">
                <LocationOnIcon />
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
