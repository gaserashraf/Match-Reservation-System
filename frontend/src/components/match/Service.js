import { matchMapper, matchMapperTo } from "./mapper";
import Axios from "axios";
import apiBaseUrl from "../../config.json";

export const getAllMatchs = (setMatchs) => {
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/fbmatch/view`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      let matchs = res?.data?.response?.matches;
      console.log(matchs);

      let matchsRet = [];
      matchs.forEach((match) => {
        matchsRet.push(matchMapperTo(match));
      });
      setMatchs(matchsRet);
      console.log(matchsRet);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
    });
};

export const handleAddMatch = (match) => {
  console.log(match);
  return 1;
};

export const handleEditMatch = (match) => {
  console.log(match);
  return 1;
};
