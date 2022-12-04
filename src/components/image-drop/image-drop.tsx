import React, { useContext } from "react";
import { Group, Image, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import DoneIcon from "@mui/icons-material/Done";
import ImageIcon from "@mui/icons-material/Image";
import { QuackleContext } from "../../context/user-context";
import { IImageDrop } from "../../types/settings";

export const ImageDrop: React.FC<IImageDrop> = (props) => {
  const { userData } = useContext(QuackleContext);
  // const [imageSrc, setImageSrc] = useState("");

  return (
    <Dropzone
      onDrop={(files) => {
        props.setSetting((prev) => {
          return { ...prev, [props.imageType]: URL.createObjectURL(files[0]) };
        });
        props.changeSetting(props.imageType);
      }}
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
        {userData[props.imageType] ? (
          <Image
            src={userData[props.imageType]}
            imageProps={{
              onLoad: () => URL.revokeObjectURL(userData[props.imageType]),
            }}
          ></Image>
        ) : (
          <div>
            <Text size="sm" color="dimmed">
              Drag images or click to select files
            </Text>
          </div>
        )}
      </Group>
    </Dropzone>
  );
};
