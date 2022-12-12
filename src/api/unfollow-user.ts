import axios from "axios";
import { apiUrl } from "./api-url";

export const unfollowUser = async (username: string, followingUser: string) => {
  await axios
    .delete(`${apiUrl}/user/${username}/following/${followingUser}`)
    .then((res) => {
      console.log(res.data);
      axios
        .delete(`${apiUrl}/user/${followingUser}/followers/${followingUser}`)
        .then((res) => console.log(res.data))
        .catch((e) => console.error(e, "Could not unfollow user"));
    })
    .catch((e) => console.error(e, "Could not unfollow user"));
};
