import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { Accordion, Button, Loader, Text, Textarea } from "@mantine/core";
import { ISettingsOptions } from "../../types/settings";
import EditIcon from "@mui/icons-material/Edit";
import "./settings-options.css";

export const SettingsOptions: React.FC<ISettingsOptions> = (props) => {
  const { userData } = useContext(QuackleContext);

  return (
    <Accordion multiple={false}>
      <Accordion.Item value={props.option}>
        <Accordion.Control
          sx={{ lineHeight: 1.3, textTransform: "capitalize" }}
        >
          {props.option}
        </Accordion.Control>
        <Accordion.Panel>
          <span className="user-settings">
            {!props.editOption[props.option] &&
              !props.loading &&
              !userData[props.option] && (
                <Text color="dimmed" size="md">
                  Enter your {props.option}
                </Text>
              )}
            {props.editOption[props.option] && !props.loading && (
              <Textarea
                value={props.setting[props.option]}
                onChange={(e) =>
                  props.setSetting((prev) => {
                    return { ...prev, [props.option]: e.target.value };
                  })
                }
                sx={{ flex: "1 1 auto", margin: "0 2%" }}
              />
            )}
            {props.loading && <Loader />}
            {!props.editOption[props.option] && !props.loading && (
              <Text size="sm">{userData[props.option]}</Text>
            )}
            <Button
              variant="outline"
              color="dark"
              onClick={() => props.changeSetting(props.option)}
            >
              {props.editOption[props.option] ? "Confirm" : <EditIcon />}
            </Button>
          </span>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
