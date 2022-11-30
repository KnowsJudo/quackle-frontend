import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { Accordion, Button, Loader, Text, Textarea } from "@mantine/core";
import EditIcon from "@mui/icons-material/Edit";
import { ISettingsOptions } from "../../types/settings";
import "./settings-options.css";

export const SettingsOptions: React.FC<ISettingsOptions> = (props) => {
  const { userData } = useContext(QuackleContext);

  return (
    <Accordion defaultValue="tagline">
      <Accordion.Item value="tagline">
        <Accordion.Control sx={{ lineHeight: 1.3 }}>Tagline</Accordion.Control>
        <Accordion.Panel>
          <span className="user-tagline">
            {!props.editTag && !props.loading && !userData.tagline && (
              <Text color="dimmed">Enter a tagline</Text>
            )}
            {props.editTag && !props.loading && (
              <Textarea
                value={props.tagline}
                onChange={(e) => props.setTagline(e.target.value)}
                sx={{ flex: " 1 1 auto", margin: "0 2%" }}
              ></Textarea>
            )}
            {props.loading && <Loader />}
            {!props.editTag && !props.loading && (
              <Text size="sm">{userData.tagline}</Text>
            )}
            <Button
              variant="outline"
              color="dark"
              onClick={() => props.changeTagline()}
            >
              {props.editTag ? "Confirm" : <EditIcon />}
            </Button>
          </span>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
