import { teamMapperTo } from "./mapper";
import Axios from "axios";
import apiBaseUrl from "../../config.json";
export const getAllTeams = (setTeams, setTeamsLoading) => {
  setTeamsLoading(true);
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/team/all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      let teams = res?.data?.response?.teams;
      let teamsRet = [];
      teams.forEach((team) => {
        teamsRet.push(teamMapperTo(team));
      });

      setTeams(teamsRet);
      setTeamsLoading(false);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      setTeamsLoading(false);
    });
};
