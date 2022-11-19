import React from "react";
import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  Button,
  Tooltip,
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
  image,
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
          src={image}
          alt="With default placeholder"
          withPlaceholder
          height={100}
        />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text size="sm" weight={700}>
          {title}
        </Text>
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
      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {description}
      </Text>
      <span className="card-followers">
        <Link
          to="/following"
          style={{ color: "black", textDecoration: "none" }}
        >
          <Text size="sm"> Following</Text>
        </Link>
        <Link
          to="/followers"
          style={{ color: "black", textDecoration: "none", marginLeft: "2em" }}
        >
          <Text size="sm">Followers</Text>
        </Link>
      </span>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
};
