import React, { useContext, useState } from "react";
import { Group, Image, Text } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import DoneIcon from "@mui/icons-material/Done";
import ImageIcon from "@mui/icons-material/Image";
import { QuackleContext } from "../../context/user-context";
import { IImageDrop } from "../../types/settings";

export const ImageDrop: React.FC<IImageDrop> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [imgPreview, setImgPreview] = useState("");

  const handleDrop = (file: FileWithPath[]) => {
    setImgPreview(URL.createObjectURL(file[0]));
    props.setSetting((prev) => {
      return { ...prev, [props.imageType]: URL.createObjectURL(file[0]) };
    });
    props.setEditOption((prev) => {
      return { ...prev, [props.imageType]: true };
    });
  };

  return (
    <Dropzone
      onDrop={(file) => handleDrop(file)}
      onReject={(files) => console.error(files)}
      accept={["image/png", "image/jpeg", "image/sgv+xml", "image/gif"]}
      maxSize={3 * 1024 ** 2}
    >
      {imgPreview ? (
        <Image
          src={imgPreview}
          imageProps={{
            onLoad: () => URL.revokeObjectURL(userData[props.imageType]),
          }}
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
