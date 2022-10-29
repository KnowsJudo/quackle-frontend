import Cookies from "js-cookie";

export const stdHeader = () => {
  const token = Cookies.get("jwtToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? "Bearer " + token : "",
  };
  return { headers: headers };
};
