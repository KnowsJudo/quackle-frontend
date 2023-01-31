import axios from "axios";
import { apiUrl } from "./api-url";

export const getQuacks = async (list: string[], id: boolean, user?: string) => {
  const newList = user ? [...list, user] : list;
  if (!id) {
    try {
      const promises = newList.map(async (next) => {
        const res = await axios.get(`${apiUrl}/user/${next}/quacks/`);
        return res.data && res.data;
      });
      const results = await Promise.all(promises);
      //Check quacks exist and combine array results
      const responses = results.filter((a) => a).flat();
      return responses;
    } catch (err) {
      console.error(err);
    }
  }
  try {
    const promises = newList.map(async (next) => {
      const res = await axios.get(`${apiUrl}/user/any/quacks/${next}`);
      return res.data;
    });
    const results = await Promise.all(promises);
    //Check quacks exist and combine array results
    const responses = results.filter((a) => a).flat();
    return responses;
  } catch (err) {
    console.error(err);
  }
};
