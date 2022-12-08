import React from "react";
import { Group, Image, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import DoneIcon from "@mui/icons-material/Done";
import ImageIcon from "@mui/icons-material/Image";
import { IImageDrop } from "../../types/settings";

export const ImageDrop: React.FC<IImageDrop> = (props) => {
  return (
    <Dropzone
      onDrop={(file) => props.handleDrop(file)}
      onReject={(files) => console.error(files)}
      accept={[
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/gif",
        "image/webp",
      ]}
      maxSize={3 * 1024 ** 2}
      sx={{ borderRadius: props.imageType === "avatar" ? "50%" : "none" }}
    >
      {props.imagePreview ? (
        <Image
          src={props.imagePreview}
          width={props.imageType === "avatar" ? 150 : 400}
          height={150}
          radius={props.imageType === "avatar" ? 100 : 0}
        />
      ) : (
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
      )}
    </Dropzone>
  );
};
