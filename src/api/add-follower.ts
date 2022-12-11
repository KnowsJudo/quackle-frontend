import axios from "axios";
import { apiUrl } from "./api-url";

export const addFollower = async (
  username: string,
  followerName: string,
  followerUsername: string,
  followerAvatar?: Buffer,
  followerTagline?: string,
) => {
  await axios
    .post(`${apiUrl}/user/${username}/followers`, {
      username,
      followerName,
      followerUsername,
      followerAvatar,
      followerTagline,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => console.error(e));
};
