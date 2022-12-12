import axios from "axios";
import { apiUrl } from "./api-url";

interface FollowingData {
  username: string;
  followingName: string;
  followingUsername: string;
  followingAvatar?: Buffer;
  followingTagline?: string;
}

interface FollowerData {
  followerName: string;
  followerUsername: string;
  followerAvatar?: Buffer;
  followerTagline?: string;
}

export const followUser = async (
  followingData: FollowingData,
  followerData: FollowerData,
) => {
  const { username, followingUsername } = followingData;
  await axios
    .post(`${apiUrl}/user/${username}/following`, followingData)
    .then((res) => {
      axios.post(
        `${apiUrl}/user/${followingUsername}/followers`,
        {
          username: followingUsername,
          ...followerData,
        },
        {
          maxContentLength: 10485760,
        },
      );
      console.log("Followed user!", res);
    })
    .catch((e) => console.error(e));
};
