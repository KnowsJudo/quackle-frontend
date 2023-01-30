import React from "react";
import { Image, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IImageDrop } from "../../types/settings";
import { showNotification } from "@mantine/notifications";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export const ImageDrop: React.FC<IImageDrop> = (props) => {
  const rejectDrop = () => {
    showNotification({
      message: `File too large`,
      icon: <PriorityHighIcon />,
      color: "red",
      styles: () => ({
        root: {
          borderColor: "#282c34",
        },
      }),
    });
    console.error("File too large");
  };

  return (
    <Dropzone
      onDrop={(file) => props.handleDrop(file)}
      onReject={() => rejectDrop()}
      accept={[
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/gif",
        "image/webp",
      ]}
      maxSize={props.imageType === "avatar" ? 500000 : 1000000}
      sx={{
        borderRadius: props.imageType === "avatar" ? "50%" : "none",
        maxWidth: "75%",
      }}
    >
      {props.imagePreview ? (
        <Image
          src={props.imagePreview}
          style={{
            maxWidth: "100%",
            width: props.imageType === "avatar" ? 150 : 400,
          }}
          height={150}
          radius={props.imageType === "avatar" ? 100 : 0}
        />
      ) : (
        <span>
          <Text size="sm" color="dimmed">
            Drag images or click to select files
          </Text>
          <Text size="xs">
            Max file size: {props.imageType === "avatar" ? "500kb" : "1mb"}
          </Text>
        </span>
      )}
    </Dropzone>
  );
};
