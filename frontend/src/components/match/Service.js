import {
  matchMapper,
  matchMapperTo,
  refereeMapperTo,
  teamMapperTo,
} from "./mapper";
import Axios from "axios";
import apiBaseUrl from "../../config.json";

export const getAllMatchs = (setMatchs, setMatchsLoading) => {
  setMatchsLoading(true);
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/fbmatch/view`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      let matchs = res?.data?.response?.matches;

      let matchsRet = [];
      matchs.forEach((match) => {
        matchsRet.push(matchMapperTo(match));
      });
      setMatchs(matchsRet);
      setMatchsLoading(false);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      setMatchsLoading(false);
    });
};

export const handleAddMatch = (match, setMatchs, matchs, alertContext) => {
  let matchObj = matchMapper(match);
  console.log(matchObj);
  console.log(match);
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  Axios({
    method: "POST",
    url: `${apiBaseUrl.apiBaseUrl}/fbmatch/add`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    data: matchObj,
  })
    .then((res) => {
      let match = res?.data?.response;
      alertContext.setAlert("Match added successfully", "success");
      setMatchs([...matchs, matchMapperTo(match)]);
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("Match added failed", "error");
    });
};

export const handleEditMatch = (match, setMatchs, matchs, alertContext) => {
  let matchObj = matchMapper(match);
  console.log(matchObj);
  console.log(match);
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  Axios({
    method: "PUT",
    url: `${apiBaseUrl.apiBaseUrl}/fbmatch/edit/${match.id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    data: matchObj,
  })
    .then((res) => {
      let match = res?.data?.response;
      alertContext.setAlert("Match edited successfully", "success");
      let matchsRet = [];
      matchs.forEach((match) => {
        matchsRet.push(matchMapperTo(match));
      });
      setMatchs(matchsRet);
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("Match edited failed", "error");
    });
};

export const handleDeleteMatch = (id, setMatchs, matchs, alertContext) => {
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  console.log(id);
  Axios({
    method: "DELETE",
    url: `${apiBaseUrl.apiBaseUrl}/fbmatch/delete/${id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => {
      //let match = res?.data?.response;
      console.log(res);
      alertContext.setAlert("Match deleted successfully", "success");
      setMatchs(matchs.filter((match) => match.matchId !== id));
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("Match deleted failed", "error");
    });
};

export const getMatch = (id, setMatch, setMatchLoading) => {
  setMatchLoading(true);
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/fbmatch/view/?match_id=${id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      let match = res?.data?.response?.matches[0];
      setMatch(matchMapperTo(match));
      setMatchLoading(false);
      console.log(matchMapperTo(match));
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      setMatchLoading(false);
    });
};

export const getReservedSeatsOfMatch = (
  matchId,
  stadiumId,
  setReservedSeats,
  setReservedSeatsLoading
) => {
  setReservedSeatsLoading(true);
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/stadium/reserved_seats/${stadiumId}/${matchId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      let reservedSeats = res?.data?.response?.reserved_seats;
      let reservedSeatsRet = reservedSeats;
      console.log(reservedSeatsRet);
      setReservedSeats(reservedSeatsRet);
      setReservedSeatsLoading(false);
    })
    .catch((err) => {
      let res = err?.response?.data?.message;
      console.log(res);
      setReservedSeatsLoading(false);
    });
};

