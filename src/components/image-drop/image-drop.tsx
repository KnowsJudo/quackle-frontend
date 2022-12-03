import React from "react";
import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import DoneIcon from "@mui/icons-material/Done";
import ImageIcon from "@mui/icons-material/Image";

export const ImageDrop: React.FC = () => {
  return (
    <Dropzone
      onDrop={(files) => console.log(files)}
      onReject={(files) => console.error(files)}
      accept={["image/png", "image/jpeg", "image/sgv+xml", "image/gif"]}
      maxSize={3 * 1024 ** 2}
    >
      <Group>
        <Dropzone.Accept>
          <DoneIcon />
        </Dropzone.Accept>
        <Dropzone.Reject>Files Rejected</Dropzone.Reject>
        <Dropzone.Idle>
          <ImageIcon />
        </Dropzone.Idle>
        <div>
          <Text size="sm" color="dimmed">
            Drag images or click to select files
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
