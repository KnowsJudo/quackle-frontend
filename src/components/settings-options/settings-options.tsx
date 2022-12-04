import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { Accordion, Button, Text, Textarea } from "@mantine/core";
import { ISettings, ISettingsOptions } from "../../types/settings";
import EditIcon from "@mui/icons-material/Edit";
import "./settings-options.css";
import { ImageDrop } from "../image-drop/image-drop";

export const SettingsOptions: React.FC<ISettingsOptions> = (props) => {
  const { userData } = useContext(QuackleContext);

  const imageData = (option: keyof ISettings) => {
    return option === "avatar" || option === "banner" ? true : false;
  };

  return (
    <Accordion>
      <Accordion.Item value={props.option}>
        <Accordion.Control
          sx={{
            lineHeight: 1.3,
            textTransform: "capitalize",
            fontWeight: "bolder",
          }}
        >
          {props.option}
        </Accordion.Control>
        <Accordion.Panel>
          <span className="user-settings">
            {!props.editOption[props.option] &&
              !userData[props.option] &&
              (imageData(props.option) ? (
                <ImageDrop
                  imageType={props.option}
                  changeSetting={props.changeSetting}
                  setSetting={props.setSetting}
                />
              ) : (
                <Text color="dimmed" size="sm">
                  Enter your {props.option}
                </Text>
              ))}

            {props.editOption[props.option] && (
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
            {!props.editOption[props.option] && (
              <Text size="sm" color="dimmed">
                {userData[props.option]}
              </Text>
            )}

            {!imageData(props.option) && (
              <Button
                variant="subtle"
                color="dark"
                onClick={() => props.changeSetting(props.option)}
              >
                {props.editOption[props.option] ? "Confirm" : <EditIcon />}
              </Button>
            )}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
