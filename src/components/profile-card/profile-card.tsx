import React from "react";
import { createStyles, Card, Image, Text, Group, Button } from "@mantine/core";
import { IProfileCard } from "../../types/profile-card";

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

export const CardWithStats = ({
  image,
  title,
  description,
  stats,
}: IProfileCard) => {
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
        <Image src={image} alt={title} height={100} />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text size="sm" weight={700}>
          {title}
        </Text>
        <Group spacing={5}>
          <Text size="xs" color="dimmed">
            <Button>Follow</Button>
          </Text>
        </Group>
      </Group>
      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {description}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
};
