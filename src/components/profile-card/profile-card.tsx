import React from "react";
import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  Button,
  Tooltip,
  Avatar,
} from "@mantine/core";
import { IProfileCard } from "../../types/profile-types";
import { Link } from "react-router-dom";
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
  avatar,
  banner,
  title,
  description,
  stats,
}) => {
  const { classes } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.title}>
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
          src={banner}
          alt="This user has no banner"
          withPlaceholder
          height={100}
        />
      </Card.Section>

      <Group position="apart" mt="xl">
        <span className="card-avatar">
          <Avatar size="lg" src={avatar} alt="This user has no avatar" />
          <Text size="sm" weight={700}>
            @{title}
          </Text>
        </span>
        <Group spacing={5}>
          <Tooltip
            label={
              loggedIn
                ? `Click to Follow ${title}`
                : "Log in to get updates from this user"
            }
          >
            <span>
              <Button disabled={!loggedIn}>Follow</Button>
            </span>
          </Tooltip>
        </Group>
      </Group>
      <Text mt="sm" mb="md" size="xs" sx={{ textAlign: "left" }}>
        {description}
      </Text>
      <span className="card-followers">
        <Link
          to={loggedIn ? `/profile/${title}/following` : "/login"}
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
          to={loggedIn ? `/profile/${title}/followers` : "/login"}
          style={{ color: "black", textDecoration: "none", marginLeft: "2em" }}
        >
          <Text size="sm" color="dimmed">
            Followers
          </Text>
          <Text size="sm" weight="bold">
            7465
          </Text>
        </Link>
      </span>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
};
