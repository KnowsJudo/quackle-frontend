import Cookies from "js-cookie";

export const stdHeader = (image?: boolean) => {
  const token = Cookies.get("jwtToken");
  console.log(token, "token");
  const headers = {
    "Content-Type": image ? "multipart/form-data" : "application/json",
    authorization: token ? token : "",
  };
  return { headers };
};
