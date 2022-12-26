import { stadiumMapper, stadiumMapperTo } from "./mapper";
import Axios from "axios";
import apiBaseUrl from "../../config.json";
export const handleAddStadium = (
  stadium,
  setStadiums,
  stadiums,
  alertContext
) => {
  let stadiumObj = stadiumMapper(stadium);
  console.log(stadiumObj);
  console.log(stadium);
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  Axios({
    method: "POST",
    url: `${apiBaseUrl.apiBaseUrl}/stadium/add`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    data: stadiumObj,
  })
    .then(() => {
      alertContext.setAlert("Stadium added successfully", "success");
      setStadiums([...stadiums, stadiumMapperTo(stadiumObj)]);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("Stadium added failed", "error");
    });
};

export const getAllStaduims = (setStadiums) => {
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/stadium/all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      let stadiums = res?.data?.response?.users;
      let stadiumsRet = [];
      stadiums.forEach((stadium) => {
        stadiumsRet.push(stadiumMapperTo(stadium));
      });
      setStadiums(stadiumsRet);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
    });
};
