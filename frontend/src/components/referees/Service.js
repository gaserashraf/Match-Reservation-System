import { refereeMapperTo } from "./mapper";
import Axios from "axios";
import apiBaseUrl from "../../config.json";
export const getAllReferees = (setReferees, setRefereesLoading) => {
  setRefereesLoading(true);
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/referee/all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      let referees = res?.data?.response?.referees;
      let refereesRet = [];
      referees.forEach((stadium) => {
        refereesRet.push(refereeMapperTo(stadium));
      });
      setReferees(refereesRet);
      setRefereesLoading(false);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      setRefereesLoading(false);
    });
};
