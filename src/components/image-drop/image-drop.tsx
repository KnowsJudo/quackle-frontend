import React, { useState } from "react";
import { Group, Image, Text } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import DoneIcon from "@mui/icons-material/Done";
import ImageIcon from "@mui/icons-material/Image";
import { IImageDrop } from "../../types/settings";

export const ImageDrop: React.FC<IImageDrop> = (props) => {
  const [imgPreview, setImgPreview] = useState("");

  const handleDrop = (file: FileWithPath[]) => {
    setImgPreview(URL.createObjectURL(file[0]));
    const formData = new FormData();
    formData.append("image", file[0]);
    formData.append("option", props.imageType);

    props.setSetting((prev) => {
      return { ...prev, [props.imageType]: formData };
    });
    props.setEditOption((prev) => {
      return { ...prev, [props.imageType]: true };
    });
  };

  return (
    <Dropzone
      onDrop={(file) => handleDrop(file)}
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
      {imgPreview ? (
        <Image
          src={imgPreview}
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
