import React, { useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { IProfileCard } from "../../types/profile-types";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useImage } from "../../api/use-image";
import { addFollower } from "../../api/add-follower";
import { QuackleContext } from "../../context/user-context";
import "./profile-card.css";

const useStyles = createStyles((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export const ProfileCard: React.FC<IProfileCard> = ({
  loggedIn,
  matchesUser,
  avatar,
  banner,
  name,
  username,
  description,
  location,
  stats,
}) => {
  const { userData } = useContext(QuackleContext);
  const { classes } = useStyles();

  const avatarSrc = useImage(avatar);
  const bannerSrc = useImage(banner);

  const items = stats.map((stat) => (
    <div key={stat.title} className="card-footer">
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

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
            @{username}
          </Text>
        </span>
        <Group spacing={5}>
          {!matchesUser && (
            <Tooltip
              label={
                loggedIn
                  ? `Click to Follow ${username}`
                  : "Log in to get updates from this user"
              }
            >
              <span>
                <Button
                  disabled={!loggedIn}
                  onClick={() =>
                    addFollower(
                      userData.username,
                      name,
                      username,
                      // avatar,
                      undefined,
                      description,
                    )
                  }
                >
                  Follow
                </Button>
              </span>
            </Tooltip>
          )}
        </Group>
      </div>
      <Text mt="sm" mb="md" size="xs" sx={{ textAlign: "left" }}>
        {description}
      </Text>
      <span className="card-info">
        <span className="card-follow">
          <Link
            to={
              loggedIn
                ? `/profile/${username}/following`
                : `/profile/${username}`
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
              loggedIn
                ? `/profile/${username}/followers`
                : `/profile/${username}`
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
          {location && (
            <>
              <Text size="sm" color="dimmed">
                <LocationOnIcon />
              </Text>
              <Text size="sm">{location}</Text>
            </>
          )}
        </span>
      </span>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
};
