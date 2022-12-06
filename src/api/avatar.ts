import { Buffer } from "buffer";
import { useMemo } from "react";
import { IImage } from "../types/user-types";

export const useImage = (image?: IImage) => {
  const imageSrc = useMemo(() => {
    if (!image) {
      return "";
    }

    const imageBuffer = Buffer.from(image.data);
    const imageBlob = new Blob([imageBuffer], { type: image.contentType });
    return URL.createObjectURL(imageBlob);
  }, [!!image]);

  return imageSrc;
};
